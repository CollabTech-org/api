import { Type } from 'class-transformer'
import { ArrayNotEmpty, ArrayUnique, IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'
import { IdDto } from '../../shared/dtos/id.dto'
import { PaginationDto } from '../../shared/dtos/pagination.dto'

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string

  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @Type(() => String)
  category: string[]

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  description: string

  @IsPositive()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Type(() => Number)
  stock: number

  @IsPositive()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Type(() => Number)
  price: number

  @IsPositive()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Type(() => Number)
  sale_price: number

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  tags: string
}

export class FindProductDto extends IdDto { }

export class FindAllProductDto extends PaginationDto { }

export class UpdateProductDto extends IdDto {
  @IsOptional()
  @IsString()
  @Type(() => String)
  name?: string

  @ArrayUnique()
  @IsOptional()
  @IsArray()
  @Type(() => String)
  category?: string[]

  @IsOptional()
  @IsString()
  @Type(() => String)
  description?: string

  @IsPositive()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Type(() => Number)
  stock?: number

  @IsPositive()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Type(() => Number)
  price?: number

  @IsPositive()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Type(() => Number)
  sale_price?: number

  @IsOptional()
  @IsString()
  @Type(() => String)
  tags?: string
}

export class DeleteProductDto extends IdDto { }
