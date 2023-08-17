import { Test, TestingModule } from '@nestjs/testing'
import { Category } from '@prisma/client'
import { FindCategoryDto } from '../../../../src/app/category/category.dto'
import { FindCategoryUseCase } from '../../../../src/app/category/useCases/find-category.useCase'
import { DatabaseService } from '../../../../src/database/database.service'

describe('FindCategoryUseCase', () => {
  let findCategoryUseCase: FindCategoryUseCase
  let databaseService: DatabaseService

  const CategoriesMock: Category[] = [{
    id: 'id-mock',
    name: 'name-mock',
    created_at: new Date('2023-08-17T18:22:48.635Z'),
    updated_at: new Date('2023-08-17T18:22:48.635Z'),
  }]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindCategoryUseCase, {
        provide: DatabaseService,
        useValue: {
          category: {
            findUniqueOrThrow: jest.fn().mockResolvedValue(CategoriesMock[0]),
          },
        },
      }],
    }).compile()

    findCategoryUseCase = module.get(FindCategoryUseCase)
    databaseService = module.get(DatabaseService)
  })

  it('It must be possible to define the find category use case and database service', async () => {
    await expect(findCategoryUseCase).toBeDefined()
    await expect(databaseService).toBeDefined()
  })

  describe('find', () => {
    const data: FindCategoryDto = { id: 'id-mock' }

    it('It must be possible to find a category', async () => {
      await expect(findCategoryUseCase.execute(data)).resolves.toHaveProperty('id')
    })

    it('It must be possible to capture an error when not finding a category', async () => {
      jest.spyOn(databaseService.category, 'findUniqueOrThrow').mockRejectedValueOnce(new Error())
      await expect(findCategoryUseCase.execute(data)).rejects.toThrowError()
    })
  })
})
