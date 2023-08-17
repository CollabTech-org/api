import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { IdDto } from '../../shared/dtos/id.dto'
import { PaginationDto } from '../../shared/dtos/pagination.dto'

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string
}

export class FindCategoryDto extends IdDto { }

export class FindAllCategoryDto extends PaginationDto { }

export class UpdateCategoryDto extends IdDto {
  @IsOptional()
  @IsString()
  name?: string
}

export class DeleteCategoryDto extends IdDto { }
