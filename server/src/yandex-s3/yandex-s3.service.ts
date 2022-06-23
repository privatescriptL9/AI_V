import { Injectable } from '@nestjs/common'

import EasyYandexS3 = require('easy-yandex-s3')

type Folder = 'avatars' | 'datasets'

@Injectable()
export class YandexS3Service {
  private s3

  constructor() {
    this.s3 = new EasyYandexS3({
      auth: {
        accessKeyId: 'YCAJE1IaHmK35mkcWZIS-Md0B',
        secretAccessKey: 'YCMETbsE8ztFCibG8w4NEsNKQe0vjnrkAEx4NJe4'
      },
      Bucket: 'ai-v',
      debug: false
    })
  }

  async uploadFile(file: any, name: string, folder: Folder) {
    return await this.s3.Upload(
      {
        buffer: file,
        name
      },
      `/${folder}/`
    )
  }

  async deleteFile(fileName: string, folder: Folder) {
    return await this.s3.Remove(`${folder}/${fileName}`)
  }
}
