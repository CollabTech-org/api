import { Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common'
import { DatabaseService } from '../../../database/database.service'
import { MyLoggerService } from '../../../logger/logger.service'
import { UpdateCategoryDto } from '../category.dto'
import { CategoryPartialEntity } from '../category.entity'

@Injectable()
export class UpdateCategoryUseCase {
  private readonly myLoggerService = new MyLoggerService(UpdateCategoryUseCase.name)

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(data: UpdateCategoryDto): Promise<CategoryPartialEntity> {
    const { id, name } = data

    await this.databaseService.category.findUniqueOrThrow({
      where: { id },
    }).catch((stack) => {
      this.myLoggerService.error('Category not found', stack)
      throw new NotFoundException('Category not found')
    })

    await this.databaseService.category.findUnique({
      where: { name },
    }).then((response) => {
      if (response) {
        this.myLoggerService.error('Category already exists with this name')
        throw new NotAcceptableException('Category already exists with this name')
      }
    })

    const categoryNew = await this.databaseService.category.update({
      where: { id },
      data: { name },
      select: { id: true },
    }).catch((stack) => {
      this.myLoggerService.error('Unexpected error while updating the category', stack)
      throw new InternalServerErrorException('Unexpected error while updating the category')
    })

    this.myLoggerService.log('Category updated')

    return categoryNew
  }
}
