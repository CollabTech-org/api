import { Test, TestingModule } from '@nestjs/testing'
import { Product } from '@prisma/client'
import { UpdateProductDto } from '../../../../src/app/product/product.dto'
import { UpdateProductUseCase } from '../../../../src/app/product/useCases/update-product.useCase'
import { DatabaseService } from '../../../../src/database/database.service'

describe('UpdateProductUseCase', () => {
  let updateProductUseCase: UpdateProductUseCase
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
      providers: [UpdateProductUseCase, {
        provide: DatabaseService,
        useValue: {
          product: {
            findUnique: jest.fn().mockResolvedValue(undefined),
            findUniqueOrThrow: jest.fn().mockResolvedValue(ProductsMock[0]),
            update: jest.fn().mockResolvedValue(ProductsMock[0]),
          },
        },
      }],
    }).compile()

    updateProductUseCase = module.get(UpdateProductUseCase)
    databaseService = module.get(DatabaseService)
  })

  it('It must be possible to define the update product use case and database service', async () => {
    await expect(updateProductUseCase).toBeDefined()
    await expect(databaseService).toBeDefined()
  })

  describe('update', () => {
    const data: UpdateProductDto = {
      id: 'id-mock',
      name: 'name-update-mock',
      category: ['category-update-mock'],
      description: 'description-update-mock',
      stock: 4,
      price: 5.55,
      sale_price: 6.66,
      tags: 'tag-update-mock',
    }

    it('It must be possible to update a product', async () => {
      await expect(updateProductUseCase.execute(data)).resolves.toHaveProperty('id')
    })

    it('It must be possible to capture an error when not finding a product', async () => {
      jest.spyOn(databaseService.product, 'findUniqueOrThrow').mockRejectedValueOnce(new Error())
      await expect(updateProductUseCase.execute(data)).rejects.toThrowError()
    })

    it('It must not be possible to update a product with an existing name', async () => {
      jest.spyOn(databaseService.product, 'findUnique').mockResolvedValueOnce(ProductsMock[0])
      await expect(updateProductUseCase.execute(data)).rejects.toThrowError()
    })

    it('It must be possible to capture an unexpected error when updating a product', async () => {
      jest.spyOn(databaseService.product, 'update').mockRejectedValueOnce(new Error())
      await expect(updateProductUseCase.execute(data)).rejects.toThrowError()
    })
  })
})
