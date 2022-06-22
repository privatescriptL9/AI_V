import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import * as fs from 'fs'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.user.findMany()
  }

  async changeAvatar(user: any, file: any) {
    if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
      throw new BadRequestException('Файл не верного формата')
    }

    const currentUser = await this.prismaService.user.findUnique({
      where: {
        email: user.email
      }
    })
    let currentAvatar

    if (currentUser.avatar_url) {
      currentAvatar = currentUser.avatar_url.split('/')[3]
    }

    const filename = user.sub + '_' + file.originalname
    const path = `avatars/${filename}`
    fs.writeFile(path, file.buffer, err => {
      // eslint-disable-next-line no-console
      if (err) return console.error(err)
    })

    if (currentAvatar && currentAvatar !== filename) {
      fs.unlink(`avatars/${currentAvatar}`, err => {
        // eslint-disable-next-line no-console
        if (err) return console.error(err)
      })
    }

    await this.prismaService.user.update({
      where: {
        email: currentUser.email
      },
      data: {
        avatar_url: `${process.env.API_URL}/${filename}`
      }
    })
  }

  async updateInfo(user: any, updateInfo: any) {
    const currentUser = await this.prismaService.user.findUnique({ where: { id: user.sub } })
    const { username, password } = updateInfo
    let hash

    if (password) {
      hash = await bcrypt.hash(password, 10)
    }

    await this.prismaService.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        username: username ? username : currentUser.username,
        hash: password ? hash : currentUser.hash
      }
    })

    return currentUser
  }
}
