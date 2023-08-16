import { Test, TestingModule } from '@nestjs/testing'
import { IndexModule } from '../../src/app/index.module'

describe('IndexModule', () => {
  let indexModule: IndexModule

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IndexModule],
    }).compile()

    indexModule = module.get(IndexModule)
  })

  it('It must be possible to define the index module', async () => {
    await expect(indexModule).toBeDefined()
  })
})
