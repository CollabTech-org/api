import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator'

export class PaginationDto {
  @Min(1)
  @IsPositive()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Type(() => Number)
  take?: number

  @Min(1)
  @IsPositive()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Type(() => Number)
  page?: number
}
