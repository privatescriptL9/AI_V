import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async getAll(dataId: number) {
    return await this.prismaService.comment.findMany({
      where: {
        dataId: Number(dataId)
      }
    })
  }

  async add(userId, dataId, text) {
    return await this.prismaService.comment.create({
      data: {
        userId,
        dataId,
        text
      }
    })
  }
}
