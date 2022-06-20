import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.user.findMany()
  }

  async changeAvatar(user: any, file: any) {
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
}
