import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class DatasetService {
  constructor(private prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.dataset.findMany()
  }

  async addToFavorite(datasetId: number, userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) throw new BadRequestException('Такого пользователя не существует')

    if (!user.favorites.includes(datasetId)) {
      const favorites = [...user.favorites, datasetId]

      await this.prismaService.user.update({
        where: {
          id: userId
        },
        data: {
          favorites
        }
      })
    } else {
      throw new BadRequestException('Уже в избранном')
    }
  }

  async removeFromFavorite(datasetId: number, userId) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) throw new BadRequestException('Такого пользователя не существует')

    if (user.favorites.includes(datasetId)) {
      const favorites = user.favorites.filter((item: any) => item.id === datasetId)
      await this.prismaService.user.update({
        where: {
          id: userId
        },
        data: {
          favorites
        }
      })
    } else {
      throw new BadRequestException('Еще не добавлен')
    }
  }

  async getAllFavorites(userId) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) throw new BadRequestException('Такого пользователя не существует')

    const favoriteIds = user.favorites

    const favorites = await this.prismaService.dataset.findMany({
      where: {
        id: { in: favoriteIds }
      }
    })

    return favorites
  }
}
