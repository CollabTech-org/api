import { Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common'
import { DatabaseService } from '../../../database/database.service'
import { MyLoggerService } from '../../../logger/logger.service'
import { CreateCategoryDto } from '../category.dto'
import { CategoryPartialEntity } from '../category.entity'

@Injectable()
export class CreateCategoryUseCase {
  private readonly myLoggerService = new MyLoggerService(CreateCategoryUseCase.name)

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(data: CreateCategoryDto): Promise<CategoryPartialEntity> {
    const { name } = data

    await this.databaseService.category.findUnique({
      where: { name },
    }).then((response) => {
      if (response) {
        this.myLoggerService.error('Category already exists with this name')
        throw new NotAcceptableException('Category already exists with this name')
      }
    })

    const category = await this.databaseService.category.create({
      data: { name },
      select: { id: true },
    }).catch((stack) => {
      this.myLoggerService.error('Unexpected error while creating the category', stack)
      throw new InternalServerErrorException('Unexpected error while creating the category')
    })

    this.myLoggerService.log('Category created')

    return category
  }
}
