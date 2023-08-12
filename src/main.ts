import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { IndexModule } from './app/index.module'
import { ValidationDtoPipe } from './pipes/validation-dto.pipe'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    IndexModule,
    new FastifyAdapter(),
  )

  app.useGlobalPipes(new ValidationDtoPipe())

  await app.listen(process.env.PORT)
}

bootstrap()
