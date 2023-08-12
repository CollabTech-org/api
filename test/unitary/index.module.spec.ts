import { Test, TestingModule } from '@nestjs/testing'
import { IndexModule } from '../../src/app/index.module'

describe('IndexModule', () => {
  let indexModule: IndexModule

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IndexModule],
    }).compile()

    indexModule = module.get<IndexModule>(IndexModule)
  })

  it('Should be defined index module', () => {
    expect(indexModule).toBeDefined()
  })
})
