import { PartialType } from '@nestjs/mapped-types'
import { Product } from '@prisma/client'

export class ProductEntity implements Product {
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

export class ProductPartialEntity extends PartialType(ProductEntity) { }
