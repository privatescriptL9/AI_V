import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  private readonly logger = new Logger('Mail Service')

  async sendEmail(options: ISendMailOptions) {
    try {
      await this.mailerService.sendMail({
        from: process.env.SMTP_USER,
        ...options
      })

      this.logger.log('Письмо отправлено')
    } catch (error) {
      this.logger.error(error)
      return false
    }

    return true
  }
}
