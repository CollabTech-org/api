import { Test, TestingModule } from '@nestjs/testing'
import { Category } from '@prisma/client'
import { CreateCategoryDto } from '../../../../src/app/category/category.dto'
import { CreateCategoryUseCase } from '../../../../src/app/category/useCases/create-category.useCase'
import { DatabaseService } from '../../../../src/database/database.service'

describe('CreateCategoryUseCase', () => {
  let createCategoryUseCase: CreateCategoryUseCase
  let databaseService: DatabaseService

  const CategoriesMock: Category[] = [{
    id: 'id-mock',
    name: 'name-mock',
    created_at: new Date('2023-08-17T18:22:48.635Z'),
    updated_at: new Date('2023-08-17T18:22:48.635Z'),
  }]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCategoryUseCase, {
        provide: DatabaseService,
        useValue: {
          category: {
            create: jest.fn().mockResolvedValue(CategoriesMock[0]),
            findUnique: jest.fn().mockResolvedValue(undefined),
          },
        },
      }],
    }).compile()

    createCategoryUseCase = module.get(CreateCategoryUseCase)
    databaseService = module.get(DatabaseService)
  })

  it('It must be possible to define the create category use case and database service', async () => {
    await expect(createCategoryUseCase).toBeDefined()
    await expect(databaseService).toBeDefined()
  })

  describe('create', () => {
    const data: CreateCategoryDto = { name: 'name-mock' }

    it('It must be possible to create a category', async () => {
      await expect(createCategoryUseCase.execute(data)).resolves.toHaveProperty('id')
    })

    it('It must not be possible to create a category with an existing name', async () => {
      jest.spyOn(databaseService.category, 'findUnique').mockResolvedValueOnce(CategoriesMock[0])
      await expect(createCategoryUseCase.execute(data)).rejects.toThrowError()
    })

    it('It must be possible to capture an unexpected error when creating a category', async () => {
      jest.spyOn(databaseService.category, 'create').mockRejectedValueOnce(new Error())
      await expect(createCategoryUseCase.execute(data)).rejects.toThrowError()
    })
  })
})
