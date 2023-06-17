import { PipeTransform, BadRequestException, Injectable, ArgumentMetadata } from '@nestjs/common'

const validTypes = ['top', 'albums', 'fans', 'related', 'radio', 'playlists']

@Injectable()
export class ArtistDataType implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value && !validTypes.includes(value)) {
      throw new BadRequestException('Invalid type for artist data')
    }

    return value
  }
}
