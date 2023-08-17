import { Test, TestingModule } from '@nestjs/testing'
import { Category } from '@prisma/client'
import { FindAllCategoryDto } from '../../../../src/app/category/category.dto'
import { FindAllCategoryUseCase } from '../../../../src/app/category/useCases/find-all-category.useCase'
import { DatabaseService } from '../../../../src/database/database.service'

describe('FindAllCategoryUseCase', () => {
  let findAllCategoryUseCase: FindAllCategoryUseCase
  let databaseService: DatabaseService

  const CategoriesMock: Category[] = [{
    id: 'id-mock',
    name: 'name-mock',
    created_at: new Date('2023-08-17T18:22:48.635Z'),
    updated_at: new Date('2023-08-17T18:22:48.635Z'),
  }]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllCategoryUseCase, {
        provide: DatabaseService,
        useValue: {
          category: {
            findMany: jest.fn().mockResolvedValue(CategoriesMock),
          },
        },
      }],
    }).compile()

    findAllCategoryUseCase = module.get(FindAllCategoryUseCase)
    databaseService = module.get(DatabaseService)
  })

  it('It must be possible to define the find all category use case and database service', async () => {
    await expect(findAllCategoryUseCase).toBeDefined()
    await expect(databaseService).toBeDefined()
  })

  describe('findAll', () => {
    const data: FindAllCategoryDto = { take: 50, page: 1 }

    it('It must be possible to find all categories', async () => {
      await expect(findAllCategoryUseCase.execute(data)).resolves.toHaveProperty('[0].id')
    })

    it('It must be possible to find all categories with default date values', async () => {
      await expect(findAllCategoryUseCase.execute({})).resolves.toHaveProperty('[0].id')
    })

    it('It must be possible to capture an unexpected error when finding all categories', async () => {
      jest.spyOn(databaseService.category, 'findMany').mockRejectedValueOnce(new Error())
      await expect(findAllCategoryUseCase.execute(data)).rejects.toThrowError()
    })
  })
})
