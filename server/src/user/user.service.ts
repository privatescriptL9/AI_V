import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service'
import { YandexS3Service } from 'src/yandex-s3/yandex-s3.service'

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService, private yandexS3Service: YandexS3Service) {}

  getAll() {
    return this.prismaService.user.findMany()
  }

  async changeAvatar(user: any, file: any) {
    if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
      throw new BadRequestException('Файл неверного формата')
    }

    const currentUser = await this.prismaService.user.findUnique({
      where: {
        email: user.email
      }
    })
    let currentAvatar

    if (currentUser.avatar_url) {
      currentAvatar = currentUser.avatar_url.split('/')[4]
    }

    await this.yandexS3Service.deleteFile(currentAvatar, 'avatars')

    const uploadedFile = await this.yandexS3Service.uploadFile(
      file.buffer,
      `${user.sub}-${file.originalname}`,
      'avatars'
    )

    await this.prismaService.user.update({
      where: {
        email: currentUser.email
      },
      data: {
        avatar_url: uploadedFile.Location
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
