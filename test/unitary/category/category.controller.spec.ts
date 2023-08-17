import { Test, TestingModule } from '@nestjs/testing'
import { Category } from '@prisma/client'
import { CategoryController } from '../../../src/app/category/category.controller'
import { CreateCategoryDto, DeleteCategoryDto, FindAllCategoryDto, FindCategoryDto, UpdateCategoryDto } from '../../../src/app/category/category.dto'
import { CreateCategoryUseCase } from '../../../src/app/category/useCases/create-category.useCase'
import { DeleteCategoryUseCase } from '../../../src/app/category/useCases/delete-category.useCase'
import { FindAllCategoryUseCase } from '../../../src/app/category/useCases/find-all-category.useCase'
import { FindCategoryUseCase } from '../../../src/app/category/useCases/find-category.useCase'
import { UpdateCategoryUseCase } from '../../../src/app/category/useCases/update-category.useCase'

describe('CategoryController', () => {
  let categoryController: CategoryController
  let createCategoryUseCase: CreateCategoryUseCase
  let findCategoryUseCase: FindCategoryUseCase
  let findAllCategoryUseCase: FindAllCategoryUseCase
  let updateCategoryUseCase: UpdateCategoryUseCase
  let deleteCategoryUseCase: DeleteCategoryUseCase

  const CategoriesMock: Category[] = [{
    id: 'id-mock',
    name: 'name-mock',
    created_at: new Date('2023-08-17T18:22:48.635Z'),
    updated_at: new Date('2023-08-17T18:22:48.635Z'),
  }]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CreateCategoryUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(CategoriesMock[0]),
          },
        },
        {
          provide: FindCategoryUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(CategoriesMock[0]),
          },
        },
        {
          provide: FindAllCategoryUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(CategoriesMock),
          },
        },
        {
          provide: UpdateCategoryUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(CategoriesMock[0]),
          },
        },
        {
          provide: DeleteCategoryUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile()

    categoryController = module.get(CategoryController)
    createCategoryUseCase = module.get(CreateCategoryUseCase)
    findCategoryUseCase = module.get(FindCategoryUseCase)
    findAllCategoryUseCase = module.get(FindAllCategoryUseCase)
    updateCategoryUseCase = module.get(UpdateCategoryUseCase)
    deleteCategoryUseCase = module.get(DeleteCategoryUseCase)
  })

  it('It must be possible to define the category module and category use cases', async () => {
    await expect(categoryController).toBeDefined()
    await expect(createCategoryUseCase).toBeDefined()
    await expect(findCategoryUseCase).toBeDefined()
    await expect(findAllCategoryUseCase).toBeDefined()
    await expect(updateCategoryUseCase).toBeDefined()
    await expect(deleteCategoryUseCase).toBeDefined()
  })

  describe('create', () => {
    const data: CreateCategoryDto = { name: 'name-mock' }

    it('It must be possible to create a category', async () => {
      await expect(categoryController.create(data)).resolves.toHaveProperty('id')
    })
  })

  describe('find', () => {
    const data: FindCategoryDto = { id: 'id-mock' }

    it('It must be possible to find a category', async () => {
      await expect(categoryController.find(data)).resolves.toHaveProperty('id')
    })
  })

  describe('findAll', () => {
    const data: FindAllCategoryDto = { take: 50, page: 1 }

    it('It must be possible to find all categories', async () => {
      await expect(categoryController.findAll(data)).resolves.toHaveProperty('[0].id')
    })
  })

  describe('update', () => {
    const data: UpdateCategoryDto = { id: 'id-mock', name: 'name-update-mock' }

    it('It must be possible to update a category', async () => {
      await expect(categoryController.update(data)).resolves.toHaveProperty('id')
    })
  })

  describe('delete', () => {
    const data: DeleteCategoryDto = { id: 'id-mock' }

    it('It must be possible to delete a category', async () => {
      await expect(categoryController.delete(data)).resolves.toBeUndefined()
    })
  })
})
