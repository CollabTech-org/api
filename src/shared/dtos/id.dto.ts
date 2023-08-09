import { Type } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class IdDto {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
    id: string
}
