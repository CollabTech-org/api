import { NestFactory } from '@nestjs/core'
import { IndexModule } from './app/index.module'
import { ValidationDtoPipe } from './pipes/validation-dto.pipe'

async function bootstrap() {
  const app = await NestFactory.create(IndexModule)

  app.useGlobalPipes(new ValidationDtoPipe())

  await app.listen(process.env.PORT)
}

bootstrap()
