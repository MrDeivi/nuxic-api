import { PipeTransform, BadRequestException, Injectable, ArgumentMetadata } from '@nestjs/common'

const validTypes = ['album', 'artist', 'track']

@Injectable()
export class SearchDataType implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value && !validTypes.includes(value)) {
      throw new BadRequestException('Invalid type for search data')
    }

    return value
  }
}
