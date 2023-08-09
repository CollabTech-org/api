import { Injectable, PipeTransform } from '@nestjs/common'
import { ClassConstructor, plainToClass } from 'class-transformer'

@Injectable()
export class ConvertDataDTOPipe implements PipeTransform {
  private readonly dto: ClassConstructor<unknown>

  constructor(dto) { this.dto = dto }

  async transform(data: object) {
    const result = plainToClass(this.dto, data)

    return result
  }
}
