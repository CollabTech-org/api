import { PartialType } from '@nestjs/mapped-types'
import { Category } from '@prisma/client'

export class CategoryEntity implements Category {
  id: string

  name: string

  created_at: Date

  updated_at: Date
}

export class CategoryPartialEntity extends PartialType(CategoryEntity) { }
