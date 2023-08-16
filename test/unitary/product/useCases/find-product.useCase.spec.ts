import { Test, TestingModule } from '@nestjs/testing'
import { Product } from '@prisma/client'
import { FindProductDto } from '../../../../src/app/product/product.dto'
import { FindProductUseCase } from '../../../../src/app/product/useCases/find-product.useCase'
import { DatabaseService } from '../../../../src/database/database.service'

describe('FindProductUseCase', () => {
  let findProductUseCase: FindProductUseCase
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
      providers: [FindProductUseCase, {
        provide: DatabaseService,
        useValue: {
          product: {
            findUniqueOrThrow: jest.fn().mockResolvedValue(ProductsMock[0]),
          },
        },
      }],
    }).compile()

    findProductUseCase = module.get(FindProductUseCase)
    databaseService = module.get(DatabaseService)
  })

  it('It must be possible to define the find product use case and database service', async () => {
    await expect(findProductUseCase).toBeDefined()
    await expect(databaseService).toBeDefined()
  })

  describe('find', () => {
    const data: FindProductDto = { id: 'id-mock' }

    it('It must be possible to find a product', async () => {
      await expect(findProductUseCase.execute(data)).resolves.toHaveProperty('id')
    })

    it('It must be possible to capture an error when not finding a product', async () => {
      jest.spyOn(databaseService.product, 'findUniqueOrThrow').mockRejectedValueOnce(new Error())
      await expect(findProductUseCase.execute(data)).rejects.toThrowError()
    })
  })
})
