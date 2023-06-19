import { CacheInterceptor } from '@nestjs/cache-manager'
import { Controller, Get, Param, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common'
import { DeezerService } from './deezer.service'
import { PaginationDto } from './dto'
import { ArtistDataType } from './validators/artistType.pipe'
import { RadioDataType } from './validators/radioType.pipe'
import { SearchDataType } from './validators/searchType.pipe'

@Controller('deezer')
@UseInterceptors(CacheInterceptor)
export class DeezerController {
  constructor(private deezerService: DeezerService) {}

  @Get('genre')
  genres() {
    return this.deezerService.genres()
  }

  @Get('genre/:id')
  genre(@Param('id', ParseIntPipe) id) {
    return this.deezerService.genre(id)
  }

  @Get('genre/:id/artists')
  genreArtists(@Query() pagination: PaginationDto, @Param('id', ParseIntPipe) id) {
    return this.deezerService.genreArtists(id, pagination.page, pagination.limit)
  }

  @Get('search/:type?')
  search(@Param('type', SearchDataType) type, @Query('q') search) {
    return this.deezerService.search(search, type)
  }

  @Get('radio/top')
  radioTop(@Query() pagination: PaginationDto) {
    return this.deezerService.radioTop(pagination.page, pagination.limit)
  }

  @Get('radio/:id')
  radio(@Param('id', ParseIntPipe) id) {
    return this.deezerService.radio(id)
  }

  @Get('radio/:id?/tracks')
  radioTracks(@Query() pagination: PaginationDto, @Param('id', ParseIntPipe) id) {
    return this.deezerService.radioTracks(id, pagination.page, pagination.limit)
  }

  @Get('artists')
  artists(@Query() pagination: PaginationDto) {
    return this.deezerService.artists(pagination.page, pagination.limit)
  }

  @Get('albums')
  albums(@Query() pagination: PaginationDto) {
    return this.deezerService.albums(pagination.page, pagination.limit)
  }

  @Get('tracks')
  tracks(@Query() pagination: PaginationDto) {
    return this.deezerService.tracks(pagination.page, pagination.limit)
  }

  @Get('album/:id')
  album(@Param('id', ParseIntPipe) id) {
    return this.deezerService.album(id)
  }

  @Get('track/:id')
  track(@Param('id', ParseIntPipe) id) {
    return this.deezerService.track(id)
  }

  @Get('artist/:id/:type?')
  artist(@Query() pagination: PaginationDto, @Param('id', ParseIntPipe) id, @Param('type', ArtistDataType) type) {
    return this.deezerService.artist(id, type, pagination)
  }

  @Get('playlists')
  playlists(@Query() pagination: PaginationDto) {
    return this.deezerService.albums(pagination.page, pagination.limit)
  }
}
