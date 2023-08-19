import { Test, TestingModule } from '@nestjs/testing'
import { ClassTransformer, plainToClass } from 'class-transformer'
import { Validator } from 'class-validator'
import { CreateProductDto } from '../../../src/app/product/product.dto'

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

    it('It must be possible to create a valid product', async () => {
      const dtoInstance = classTransformer.plainToInstance(CreateProductDto, data)
      const validation = await validator.validate(dtoInstance)

      await expect(validation).toHaveLength(0)
    })

    it('It must not be possible to create a valid product', async () => {
      const dtoInstance = plainToClass(CreateProductDto, {})
      const validation = await validator.validate(dtoInstance)

      await expect(validation).toHaveLength(7)
    })
  })
})
