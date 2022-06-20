import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

const PORT = process.env.PORT || 4200

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  const logger = new Logger('Bootstrap')
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT, () => logger.verbose(`Server has been started on port ${PORT}`))
}

bootstrap()
