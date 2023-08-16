import { Test, TestingModule } from '@nestjs/testing'
import { Product } from '@prisma/client'
import { CreateProductDto } from '../../../../src/app/product/product.dto'
import { CreateProductUseCase } from '../../../../src/app/product/useCases/create-product.useCase'
import { DatabaseService } from '../../../../src/database/database.service'

describe('CreateProductUseCase', () => {
  let createProductUseCase: CreateProductUseCase
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
      providers: [CreateProductUseCase, {
        provide: DatabaseService,
        useValue: {
          product: {
            create: jest.fn().mockResolvedValue(ProductsMock[0]),
            findUnique: jest.fn().mockResolvedValue(undefined),
          },
        },
      }],
    }).compile()

    createProductUseCase = module.get(CreateProductUseCase)
    databaseService = module.get(DatabaseService)
  })

  it('It must be possible to define the create product use case and database service', async () => {
    await expect(createProductUseCase).toBeDefined()
    await expect(databaseService).toBeDefined()
  })

  describe('create', () => {
    const data: CreateProductDto = {
      name: 'name-mock',
      category: ['category-mock'],
      description: 'description-mock',
      stock: 1,
      price: 2.22,
      sale_price: 3.33,
      tags: 'tag-mock',
    }

    it('It must be possible to create a product', async () => {
      await expect(createProductUseCase.execute(data)).resolves.toHaveProperty('id')
    })

    it('It must not be possible to create a product with an existing name', async () => {
      jest.spyOn(databaseService.product, 'findUnique').mockResolvedValueOnce(ProductsMock[0])
      await expect(createProductUseCase.execute(data)).rejects.toThrowError()
    })

    it('It must be possible to capture an unexpected error when creating a product', async () => {
      jest.spyOn(databaseService.product, 'create').mockRejectedValueOnce(new Error())
      await expect(createProductUseCase.execute(data)).rejects.toThrowError()
    })
  })
})
