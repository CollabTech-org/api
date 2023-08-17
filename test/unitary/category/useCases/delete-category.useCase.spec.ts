import { Test, TestingModule } from '@nestjs/testing'
import { Category } from '@prisma/client'
import { DeleteCategoryDto } from '../../../../src/app/category/category.dto'
import { DeleteCategoryUseCase } from '../../../../src/app/category/useCases/delete-category.useCase'
import { DatabaseService } from '../../../../src/database/database.service'

describe('DeleteCategoryUseCase', () => {
  let deleteCategoryUseCase: DeleteCategoryUseCase
  let databaseService: DatabaseService

  const CategoriesMock: Category[] = [{
    id: 'id-mock',
    name: 'name-mock',
    created_at: new Date('2023-08-17T18:22:48.635Z'),
    updated_at: new Date('2023-08-17T18:22:48.635Z'),
  }]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteCategoryUseCase, {
        provide: DatabaseService,
        useValue: {
          category: {
            delete: jest.fn().mockResolvedValue(undefined),
            findUniqueOrThrow: jest.fn().mockResolvedValue(CategoriesMock[0]),
          },
        },
      }],
    }).compile()

    deleteCategoryUseCase = module.get(DeleteCategoryUseCase)
    databaseService = module.get(DatabaseService)
  })

  it('It must be possible to define the delete category use case and database service', async () => {
    await expect(deleteCategoryUseCase).toBeDefined()
    await expect(databaseService).toBeDefined()
  })

  describe('delete', () => {
    const data: DeleteCategoryDto = { id: 'id-mock' }

    it('It must be possible to delete a category', async () => {
      await expect(deleteCategoryUseCase.execute(data)).resolves.toBeUndefined()
    })

    it('It must be possible to capture an error when not finding a category', async () => {
      jest.spyOn(databaseService.category, 'findUniqueOrThrow').mockRejectedValueOnce(new Error())
      await expect(deleteCategoryUseCase.execute(data)).rejects.toThrowError()
    })

    it('It must be possible to capture an unexpected error when deleting a category', async () => {
      jest.spyOn(databaseService.category, 'delete').mockRejectedValueOnce(new Error())
      await expect(deleteCategoryUseCase.execute(data)).rejects.toThrowError()
    })
  })
})
