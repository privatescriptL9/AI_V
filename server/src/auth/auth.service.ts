import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { MailService } from 'src/mail/mail.service'
import { PrismaService } from 'src/prisma/prisma.service'
import * as uuid from 'uuid'

import { SignInDto, SignUpDto } from './dto'
import { AuthResponse } from './types'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService, private mailService: MailService) {}

  private signUser(sub: number, email: string, role: string) {
    const token = this.jwtService.sign({
      sub,
      email,
      role
    })

    return token
  }

  async signupLocal(dto: SignUpDto) {
    const candidate = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })
    if (candidate) throw new ForbiddenException(`Пользователь с почтовым адресом ${dto.email} уже существует`)

    const hash = await bcrypt.hash(dto.password, 10)
    const activationLink = uuid.v4()
    const newUser = this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        hash,
        activationLink
      }
    })

    const activationMailLink = `${process.env.API_URL}/auth/activate/${activationLink}`

    const mail = await this.mailService.sendEmail({
      to: dto.email,
      subject: `Активация аккаунта на ${process.env.API_URL}`,
      html: `
          <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${activationMailLink}">${activationMailLink}</a>
          </div>
      `
    })

    if (!mail) throw new ForbiddenException(`Не удалось отправить письмо на почтовый адрес ${dto.email}`)

    return newUser
  }

  async signinLocal(dto: SignInDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (!user) throw new ForbiddenException('Неверные учетные данные')

    const passwordMatches = await bcrypt.compare(dto.password, user.hash)
    if (!passwordMatches) throw new ForbiddenException('Неверные учетные данные')

    if (!user.isActivated) throw new ForbiddenException('Аккаунт не активирован, перейдите по ссылке в письме')

    const token = this.signUser(user.id, user.email, user.role)

    return {
      token,
      user
    }
  }

  async activateUser(activationLink: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        activationLink
      }
    })

    if (!user) throw new ForbiddenException('Неккоректная ссылка активации')

    if (!user.isActivated) {
      await this.prisma.user.update({
        where: {
          email: user.email
        },
        data: {
          isActivated: true
        }
      })
    }
  }

  async checkAuth(user: User) {
    const currentUser = await this.prisma.user.findUnique({
      where: {
        email: user.email
      }
    })

    const datasets = await this.prisma.dataset.findMany({
      where: {
        id: { in: currentUser.favorites }
      }
    })

    return {
      ...currentUser,
      favorites: datasets
    }
  }
}
