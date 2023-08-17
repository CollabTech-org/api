import { Test, TestingModule } from '@nestjs/testing'
import { Category } from '@prisma/client'
import { UpdateCategoryDto } from '../../../../src/app/category/category.dto'
import { UpdateCategoryUseCase } from '../../../../src/app/category/useCases/update-category.useCase'
import { DatabaseService } from '../../../../src/database/database.service'

describe('UpdateCategoryUseCase', () => {
  let updateCategoryUseCase: UpdateCategoryUseCase
  let databaseService: DatabaseService

  const CategoriesMock: Category[] = [{
    id: 'id-mock',
    name: 'name-mock',
    created_at: new Date('2023-08-17T18:22:48.635Z'),
    updated_at: new Date('2023-08-17T18:22:48.635Z'),
  }]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCategoryUseCase, {
        provide: DatabaseService,
        useValue: {
          category: {
            findUnique: jest.fn().mockResolvedValue(undefined),
            findUniqueOrThrow: jest.fn().mockResolvedValue(CategoriesMock[0]),
            update: jest.fn().mockResolvedValue(CategoriesMock[0]),
          },
        },
      }],
    }).compile()

    updateCategoryUseCase = module.get(UpdateCategoryUseCase)
    databaseService = module.get(DatabaseService)
  })

  it('It must be possible to define the update category use case and database service', async () => {
    await expect(updateCategoryUseCase).toBeDefined()
    await expect(databaseService).toBeDefined()
  })

  describe('update', () => {
    const data: UpdateCategoryDto = { id: 'id-mock', name: 'name-update-mock' }

    it('It must be possible to update a category', async () => {
      await expect(updateCategoryUseCase.execute(data)).resolves.toHaveProperty('id')
    })

    it('It must be possible to capture an error when not finding a category', async () => {
      jest.spyOn(databaseService.category, 'findUniqueOrThrow').mockRejectedValueOnce(new Error())
      await expect(updateCategoryUseCase.execute(data)).rejects.toThrowError()
    })

    it('It must not be possible to update a category with an existing name', async () => {
      jest.spyOn(databaseService.category, 'findUnique').mockResolvedValueOnce(CategoriesMock[0])
      await expect(updateCategoryUseCase.execute(data)).rejects.toThrowError()
    })

    it('It must be possible to capture an unexpected error when updating a category', async () => {
      jest.spyOn(databaseService.category, 'update').mockRejectedValueOnce(new Error())
      await expect(updateCategoryUseCase.execute(data)).rejects.toThrowError()
    })
  })
})
