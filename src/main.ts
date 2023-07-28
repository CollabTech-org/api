import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './modules/app/app.module'
import { ValidationCustomizedPipe } from './pipes/validation.customized.pipe'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  app.useGlobalPipes(new ValidationCustomizedPipe())

  await app.listen(3000)
}
bootstrap()
