import { PartialType } from '@nestjs/mapped-types'
import { Production } from '@prisma/client'

export class ProductionEntity implements Production {
  id: string

  name: string

  category: string[]

  description: string

  stock: number

  price: number

  sale_price: number

  tags: string

  created_at: Date

  updated_at: Date
}

export class ProductionPartialEntity extends PartialType(ProductionEntity) { }
