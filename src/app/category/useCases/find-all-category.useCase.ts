import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { DatabaseService } from '../../../database/database.service'
import { MyLoggerService } from '../../../logger/logger.service'
import { FindAllCategoryDto } from '../category.dto'
import { CategoryPartialEntity } from '../category.entity'

@Injectable()
export class FindAllCategoryUseCase {
  private readonly myLoggerService = new MyLoggerService(FindAllCategoryUseCase.name)

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(data: FindAllCategoryDto): Promise<CategoryPartialEntity[]> {
    const { take = 50, page = 1 } = data

    const categories = await this.databaseService.category.findMany({
      orderBy: { created_at: 'desc' },
      take,
      skip: page * take - take,
    }).catch((stack) => {
      this.myLoggerService.error('Unexpected error while found the categories', stack)
      throw new InternalServerErrorException('Unexpected error while found the categories')
    })

    this.myLoggerService.log('Categories found')

    return categories
  }
}
