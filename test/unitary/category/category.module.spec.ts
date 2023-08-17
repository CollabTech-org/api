import { Test, TestingModule } from '@nestjs/testing'
import { CategoryModule } from '../../../src/app/category/category.module'

describe('CategoryModule', () => {
  let categoryModule: CategoryModule

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CategoryModule],
    }).compile()

    categoryModule = module.get(CategoryModule)
  })

  it('It must be possible to define the category module', async () => {
    await expect(categoryModule).toBeDefined()
  })
})
