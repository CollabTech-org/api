import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common'
import { ValidationError } from '@nestjs/common/interfaces'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationDtoPipe implements PipeTransform {
  async transform<T>(dto: T, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return dto

    const object = plainToInstance(metatype, dto)

    const errors: ValidationError[] = await validate(object)

    const target = errors[0]?.target

    const inputs = errors.map(({ property, constraints, contexts }) => ({
      property, constraints, contexts,
    }))

    if (errors.length > 0) throw new UnprocessableEntityException({ target, inputs })

    return dto
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]

    const result = !types.includes(metatype)

    return result
  }
}
