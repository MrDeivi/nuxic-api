import { PipeTransform, BadRequestException, Injectable, ArgumentMetadata } from '@nestjs/common'

const validTypes = ['genres', 'top', 'lists']

@Injectable()
export class RadioDataType implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value && !validTypes.includes(value)) {
      throw new BadRequestException('Invalid type for radio data')
    }

    return value
  }
}
