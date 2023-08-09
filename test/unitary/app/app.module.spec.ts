import { Test, TestingModule } from '@nestjs/testing'
import { IndexModule } from '../../../src/app/index.module'

describe('AppModule', () => {
  let appModule: IndexModule

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IndexModule],
    }).compile()

    appModule = module.get<IndexModule>(IndexModule)
  })

  it('Should be defined app module', () => {
    expect(appModule).toBeDefined()
  })
})
