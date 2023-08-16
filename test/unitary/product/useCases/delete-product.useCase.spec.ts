import { Test, TestingModule } from '@nestjs/testing'
import { Product } from '@prisma/client'
import { DeleteProductDto } from '../../../../src/app/product/product.dto'
import { DeleteProductUseCase } from '../../../../src/app/product/useCases/delete-product.useCase'
import { DatabaseService } from '../../../../src/database/database.service'

describe('DeleteProductUseCase', () => {
  let deleteProductUseCase: DeleteProductUseCase
  let databaseService: DatabaseService

  const ProductsMock: Product[] = [{
    id: 'id-mock',
    name: 'name-mock',
    category: ['category-mock'],
    description: 'description-mock',
    stock: 1,
    price: 2.22,
    sale_price: 3.33,
    tags: 'tag-mock',
    created_at: new Date('2023-08-15T13:14:56.635Z'),
    updated_at: new Date('2023-08-15T13:14:56.635Z'),
  }]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteProductUseCase, {
        provide: DatabaseService,
        useValue: {
          product: {
            delete: jest.fn().mockResolvedValue(undefined),
            findUniqueOrThrow: jest.fn().mockResolvedValue(ProductsMock[0]),
          },
        },
      }],
    }).compile()

    deleteProductUseCase = module.get(DeleteProductUseCase)
    databaseService = module.get(DatabaseService)
  })

  it('It must be possible to define the delete product use case and database service', async () => {
    await expect(deleteProductUseCase).toBeDefined()
    await expect(databaseService).toBeDefined()
  })

  describe('delete', () => {
    const data: DeleteProductDto = { id: 'id-mock' }

    it('It must be possible to delete a product', async () => {
      await expect(deleteProductUseCase.execute(data)).resolves.toBeUndefined()
    })

    it('It must be possible to capture an error when not finding a product', async () => {
      jest.spyOn(databaseService.product, 'findUniqueOrThrow').mockRejectedValueOnce(new Error())
      await expect(deleteProductUseCase.execute(data)).rejects.toThrowError()
    })

    it('It must be possible to capture an unexpected error when deleting a product', async () => {
      jest.spyOn(databaseService.product, 'delete').mockRejectedValueOnce(new Error())
      await expect(deleteProductUseCase.execute(data)).rejects.toThrowError()
    })
  })
})
