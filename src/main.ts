import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { IndexModule } from './app/index.module'
import { MyValidationPipe } from './pipes/my-validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    IndexModule,
    new FastifyAdapter(),
  )

  app.useGlobalPipes(new MyValidationPipe())

  await app.listen(process.env.PORT)
}
bootstrap()
