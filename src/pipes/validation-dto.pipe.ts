import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationDtoPipe implements PipeTransform {
  async transform<T>(dto: T, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return dto

    const dtoInstance = plainToInstance(metatype, dto)
    const validation = await validate(dtoInstance)

    if (validation.length > 0) {
      const inputs = validation.map(({ property, constraints, contexts }) => ({
        property, constraints, contexts,
      }))

      throw new UnprocessableEntityException({ target: validation[0]?.target, inputs })
    }

    return dto
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    const result = !types.includes(metatype)
    return result
  }
}
