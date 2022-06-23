import { Module } from '@nestjs/common'

import { YandexS3Service } from './yandex-s3.service'

@Module({
  providers: [YandexS3Service],
  exports: [YandexS3Service]
})
export class YandexS3Module {}
