import { Injectable, NotFoundException } from '@nestjs/common'
import { DatabaseService } from '../../../database/database.service'
import { MyLoggerService } from '../../../logger/logger.service'
import { FindCategoryDto } from '../category.dto'
import { CategoryPartialEntity } from '../category.entity'

@Injectable()
export class FindCategoryUseCase {
  private readonly myLoggerService = new MyLoggerService(FindCategoryUseCase.name)

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(data: FindCategoryDto): Promise<CategoryPartialEntity> {
    const { id } = data

    const category = await this.databaseService.category.findUniqueOrThrow({
      where: { id },
    }).catch((stack) => {
      this.myLoggerService.error('Category not found', stack)
      throw new NotFoundException('Category not found')
    })

    this.myLoggerService.log('Category found')

    return category
  }
}
