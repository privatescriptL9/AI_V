import { Module } from '@nestjs/common'
import { YandexS3Module } from 'src/yandex-s3/yandex-s3.module'

import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [YandexS3Module],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
