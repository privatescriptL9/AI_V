import { BadRequestException, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import { formatBytes } from 'helpers/covertBytes'
import { PrismaService } from 'src/prisma/prisma.service'
import { YandexS3Service } from 'src/yandex-s3/yandex-s3.service'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const AdmZip = require('adm-zip')

@Injectable()
export class DatasetService {
  constructor(private prismaService: PrismaService, private yandexS3Service: YandexS3Service) {}

  getAll() {
    return this.prismaService.dataset.findMany()
  }

  async uploadArchive(file: any) {
    if (!['application/zip'].includes(file.mimetype)) {
      throw new BadRequestException('Файл неверного формата')
    }

    const uploadedFile = await this.yandexS3Service.uploadFile(file.buffer, file.originalname, 'datasets')

    const archive = new AdmZip(file.buffer)
    archive.extractAllTo('files')
    const filesAmount = fs.readdirSync('files').length || 1
    if (fs.existsSync('files')) {
      fs.readdirSync('files').forEach(function (file) {
        const curPath = 'files' + '/' + file
        fs.unlinkSync(curPath)
      })
      fs.rmdirSync('files')
    }

    await this.prismaService.dataset.create({
      data: {
        name: '',
        description: '',
        size: formatBytes(file.size),
        filesAmount,
        archiveLink: uploadedFile.Location,
        preview_image: ''
      }
    })
  }

  async addDataset(dto: any) {
    const dataset = await this.prismaService.dataset.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    await this.prismaService.dataset.update({
      where: {
        id: dataset.id
      },
      data: {
        name: dto.title,
        description: dto.description,
        preview_image: dto.preview
      }
    })
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
