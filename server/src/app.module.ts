import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { AuthModule } from './auth/auth.module'
import { DatasetModule } from './dataset/dataset.module'
import { MailModule } from './mail/mail.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { JwtAuthGuard } from './utils/guards/jwt-guard.guard'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'avatars')
    }),
    ConfigModule.forRoot(),
    AuthModule,
    PrismaModule,
    UserModule,
    MailModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      }
    }),
    DatasetModule
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
