import { Test, TestingModule } from '@nestjs/testing'
import { ProductModule } from '../../../src/app/product/product.module'

describe('ProductModule', () => {
  let productModule: ProductModule

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile()

    productModule = module.get(ProductModule)
  })

  it('It must be possible to define the product module', async () => {
    await expect(productModule).toBeDefined()
  })
})
