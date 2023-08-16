import { Test, TestingModule } from '@nestjs/testing'
import { Product } from '@prisma/client'
import { ProductController } from '../../../src/app/product/product.controller'
import { CreateProductDto, DeleteProductDto, FindAllProductDto, FindProductDto, UpdateProductDto } from '../../../src/app/product/product.dto'
import { CreateProductUseCase } from '../../../src/app/product/useCases/create-product.useCase'
import { DeleteProductUseCase } from '../../../src/app/product/useCases/delete-product.useCase'
import { FindAllProductUseCase } from '../../../src/app/product/useCases/find-all-product.useCase'
import { FindProductUseCase } from '../../../src/app/product/useCases/find-product.useCase'
import { UpdateProductUseCase } from '../../../src/app/product/useCases/update-product.useCase'

describe('ProductController', () => {
  let productController: ProductController
  let createProductUseCase: CreateProductUseCase
  let findProductUseCase: FindProductUseCase
  let findAllProductUseCase: FindAllProductUseCase
  let updateProductUseCase: UpdateProductUseCase
  let deleteProductUseCase: DeleteProductUseCase

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
      controllers: [ProductController],
      providers: [
        {
          provide: CreateProductUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(ProductsMock[0]),
          },
        },
        {
          provide: FindProductUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(ProductsMock[0]),
          },
        },
        {
          provide: FindAllProductUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(ProductsMock),
          },
        },
        {
          provide: UpdateProductUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(ProductsMock[0]),
          },
        },
        {
          provide: DeleteProductUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile()

    productController = module.get(ProductController)
    createProductUseCase = module.get(CreateProductUseCase)
    findProductUseCase = module.get(FindProductUseCase)
    findAllProductUseCase = module.get(FindAllProductUseCase)
    updateProductUseCase = module.get(UpdateProductUseCase)
    deleteProductUseCase = module.get(DeleteProductUseCase)
  })

  it('It must be possible to define the product module and product use cases', async () => {
    await expect(productController).toBeDefined()
    await expect(createProductUseCase).toBeDefined()
    await expect(findProductUseCase).toBeDefined()
    await expect(findAllProductUseCase).toBeDefined()
    await expect(updateProductUseCase).toBeDefined()
    await expect(deleteProductUseCase).toBeDefined()
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
      await expect(productController.create(data)).resolves.toHaveProperty('id')
    })
  })

  describe('find', () => {
    const data: FindProductDto = { id: 'id-mock' }

    it('It must be possible to find a product', async () => {
      await expect(productController.find(data)).resolves.toHaveProperty('id')
    })
  })

  describe('findAll', () => {
    const data: FindAllProductDto = { take: 50, page: 1 }

    it('It must be possible to find all products', async () => {
      await expect(productController.findAll(data)).resolves.toHaveProperty('[0].id')
    })
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
      await expect(productController.update(data)).resolves.toHaveProperty('id')
    })
  })

  describe('delete', () => {
    const data: DeleteProductDto = { id: 'id-mock' }

    it('It must be possible to delete a product', async () => {
      await expect(productController.delete(data)).resolves.toBeUndefined()
    })
  })
})
