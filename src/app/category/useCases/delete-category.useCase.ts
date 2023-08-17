import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { DatabaseService } from '../../../database/database.service'
import { MyLoggerService } from '../../../logger/logger.service'
import { DeleteCategoryDto } from '../category.dto'

@Injectable()
export class DeleteCategoryUseCase {
  private readonly myLoggerService = new MyLoggerService(DeleteCategoryUseCase.name)

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(data: DeleteCategoryDto): Promise<void> {
    const { id } = data

    await this.databaseService.category.findUniqueOrThrow({
      where: { id },
    }).catch((stack) => {
      this.myLoggerService.error('Category not found', stack)
      throw new NotFoundException('Category not found')
    })

    await this.databaseService.category.delete({
      where: { id },
    }).catch((stack) => {
      this.myLoggerService.error('Unexpected error while deleting the category', stack)
      throw new InternalServerErrorException('Unexpected error while deleting the category')
    })

    this.myLoggerService.log('Category deleted')
  }
}
