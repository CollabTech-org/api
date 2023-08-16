import { Test, TestingModule } from '@nestjs/testing'
import { Product } from '@prisma/client'
import { FindAllProductDto } from '../../../../src/app/product/product.dto'
import { FindAllProductUseCase } from '../../../../src/app/product/useCases/find-all-product.useCase'
import { DatabaseService } from '../../../../src/database/database.service'

describe('FindAllProductUseCase', () => {
  let findAllProductUseCase: FindAllProductUseCase
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
      providers: [FindAllProductUseCase, {
        provide: DatabaseService,
        useValue: {
          product: {
            findMany: jest.fn().mockResolvedValue(ProductsMock),
          },
        },
      }],
    }).compile()

    findAllProductUseCase = module.get(FindAllProductUseCase)
    databaseService = module.get(DatabaseService)
  })

  it('It must be possible to define the find all product use case and database service', async () => {
    await expect(findAllProductUseCase).toBeDefined()
    await expect(databaseService).toBeDefined()
  })

  describe('findAll', () => {
    const data: FindAllProductDto = { take: 50, page: 1 }

    it('It must be possible to find all products', async () => {
      await expect(findAllProductUseCase.execute(data)).resolves.toHaveProperty('[0].id')
    })

    it('It must be possible to find all products with default date values', async () => {
      await expect(findAllProductUseCase.execute({})).resolves.toHaveProperty('[0].id')
    })

    it('It must be possible to capture an unexpected error when finding all products', async () => {
      jest.spyOn(databaseService.product, 'findMany').mockRejectedValueOnce(new Error())
      await expect(findAllProductUseCase.execute(data)).rejects.toThrowError()
    })
  })
})
