import { Module } from '@nestjs/common'
import { YandexS3Module } from 'src/yandex-s3/yandex-s3.module'

import { DatasetController } from './dataset.controller'
import { DatasetService } from './dataset.service'

@Module({
  imports: [YandexS3Module],
  providers: [DatasetService],
  controllers: [DatasetController]
})
export class DatasetModule {}
