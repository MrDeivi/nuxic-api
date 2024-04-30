import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { urlencoded, json } from 'express'
import { ValidationPipe, Logger } from '@nestjs/common'
import { BlacklistedIpInterceptor } from './ip.interceptor'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true })
  app.enableCors()
  app.use(helmet())
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true, limit: '50mb' }))

  app.useGlobalInterceptors(new BlacklistedIpInterceptor())

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(3003)
  Logger.log('Listening port 3003', 'bootstrap')

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
