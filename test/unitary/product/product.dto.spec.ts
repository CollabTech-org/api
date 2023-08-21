import { Test, TestingModule } from '@nestjs/testing'
import { ClassTransformer } from 'class-transformer'
import { Validator } from 'class-validator'
import { CreateProductDto, DeleteProductDto, FindAllProductDto, FindProductDto, UpdateProductDto } from '../../../src/app/product/product.dto'

describe('ProductDto', () => {
  let validator: Validator
  let classTransformer: ClassTransformer

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Validator, ClassTransformer],
    }).compile()

    validator = module.get(Validator)
    classTransformer = module.get(ClassTransformer)
  })

  it('It must be possible to define the validator and class transformer', async () => {
    await expect(validator).toBeDefined()
    await expect(classTransformer).toBeDefined()
  })

  it('It must be possible to successfully validate the data of create', async () => {
    const data: CreateProductDto = {
      name: 'name-mock',
      category: ['category-mock'],
      description: 'description-mock',
      stock: 1,
      price: 2.22,
      sale_price: 3.33,
      tags: 'tag-mock',
    }

    const dtoInstance = classTransformer.plainToInstance(CreateProductDto, data)
    const validation = await validator.validate(dtoInstance)

    await expect(validation).toHaveLength(0)
  })

  it('It must be possible to successfully validate the data of find', async () => {
    const data: FindProductDto = { id: 'id-mock' }

    const dtoInstance = classTransformer.plainToInstance(FindProductDto, data)
    const validation = await validator.validate(dtoInstance)

    await expect(validation).toHaveLength(0)
  })

  it('It must be possible to successfully validate the data of find all', async () => {
    const data: FindAllProductDto = { take: 50, page: 1 }

    const dtoInstance = classTransformer.plainToInstance(FindAllProductDto, data)
    const validation = await validator.validate(dtoInstance)

    await expect(validation).toHaveLength(0)
  })

  it('It must be possible to successfully validate the data of update', async () => {
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

    const dtoInstance = classTransformer.plainToInstance(UpdateProductDto, data)
    const validation = await validator.validate(dtoInstance)

    await expect(validation).toHaveLength(0)
  })

  it('It must be possible to successfully validate the data of delete', async () => {
    const data: DeleteProductDto = { id: 'id-mock' }

    const dtoInstance = classTransformer.plainToInstance(DeleteProductDto, data)
    const validation = await validator.validate(dtoInstance)

    await expect(validation).toHaveLength(0)
  })
})
