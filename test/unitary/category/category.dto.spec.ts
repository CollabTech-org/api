import { Test, TestingModule } from '@nestjs/testing'
import { ClassTransformer } from 'class-transformer'
import { Validator } from 'class-validator'
import { CreateCategoryDto, DeleteCategoryDto, FindAllCategoryDto, FindCategoryDto, UpdateCategoryDto } from '../../../src/app/category/category.dto'

describe('CategoryDto', () => {
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
    const data: CreateCategoryDto = { name: 'name-mock' }

    const dtoInstance = classTransformer.plainToInstance(CreateCategoryDto, data)
    const validation = await validator.validate(dtoInstance)

    await expect(validation).toHaveLength(0)
  })

  it('It must be possible to successfully validate the data of find', async () => {
    const data: FindCategoryDto = { id: 'id-mock' }

    const dtoInstance = classTransformer.plainToInstance(FindCategoryDto, data)
    const validation = await validator.validate(dtoInstance)

    await expect(validation).toHaveLength(0)
  })

  it('It must be possible to successfully validate the data of find all', async () => {
    const data: FindAllCategoryDto = { take: 50, page: 1 }

    const dtoInstance = classTransformer.plainToInstance(FindAllCategoryDto, data)
    const validation = await validator.validate(dtoInstance)

    await expect(validation).toHaveLength(0)
  })

  it('It must be possible to successfully validate the data of update', async () => {
    const data: UpdateCategoryDto = { id: 'id-mock', name: 'name-update-mock' }

    const dtoInstance = classTransformer.plainToInstance(UpdateCategoryDto, data)
    const validation = await validator.validate(dtoInstance)

    await expect(validation).toHaveLength(0)
  })

  it('It must be possible to successfully validate the data of delete', async () => {
    const data: DeleteCategoryDto = { id: 'id-mock' }

    const dtoInstance = classTransformer.plainToInstance(DeleteCategoryDto, data)
    const validation = await validator.validate(dtoInstance)

    await expect(validation).toHaveLength(0)
  })
})
