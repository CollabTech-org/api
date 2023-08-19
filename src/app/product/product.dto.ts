import { ArrayNotEmpty, ArrayUnique, IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'
import { IdDto } from '../../shared/dtos/id.dto'
import { PaginationDto } from '../../shared/dtos/pagination.dto'

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  category: string[]

  @IsNotEmpty()
  @IsString()
  description: string

  @IsPositive()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 3 })
  stock: number

  @IsPositive()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 3 })
  price: number

  @IsPositive()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 3 })
  sale_price: number

  @IsNotEmpty()
  @IsString()
  tags: string
}

export class FindProductDto extends IdDto { }

export class FindAllProductDto extends PaginationDto { }

export class UpdateProductDto extends IdDto {
  @IsString()
  @IsOptional()
  name?: string

  @ArrayUnique()
  @IsOptional()
  @IsArray()
  category?: string[]

  @IsOptional()
  @IsString()
  description?: string

  @IsPositive()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  stock?: number

  @IsPositive()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  price?: number

  @IsPositive()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  sale_price?: number

  @IsOptional()
  @IsString()
  tags?: string
}

export class DeleteProductDto extends IdDto { }
