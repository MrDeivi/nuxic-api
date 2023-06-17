import { Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { DEEZER_API } from 'src/constants'

@Injectable()
export class DeezerService {
  constructor(private httpService: HttpService) {}

  get axiosRef() {
    return this.httpService.axiosRef
  }

  async genres() {
    const res = await this.axiosRef.get(`${DEEZER_API.genre}`)
    return res.data
  }

  async genre(id) {
    const res = await this.axiosRef.get(`${DEEZER_API.genre}/${id}`)
    return res.data
  }

  async genreArtists(id) {
    const res = await this.axiosRef.get(`${DEEZER_API.genre}/${id}/artists`)
    return res.data
  }

  async search(search, type) {
    const res = await this.axiosRef.get(`${DEEZER_API.search}/${type ?? ''}?q=${search}`)
    return res.data
  }

  async radio(type) {
    const res = await this.axiosRef.get(`${DEEZER_API.radio}/${type ?? ''}`)
    return res.data
  }

  async artists(page = 0, limit = 10) {
    const res = await this.axiosRef.get(`${DEEZER_API.artists}?limit=${limit}&index=${page * limit}`)
    return res.data
  }

  async tracks(page = 0, limit = 10) {
    const res = await this.axiosRef.get(`${DEEZER_API.tracks}?limit=${limit}&index=${page * limit}`)
    return res.data
  }

  async artist(id, type) {
    const res = await this.axiosRef.get(`${DEEZER_API.artist}/${id}/${type ?? ''}`)
    return res.data
  }

  async track(id) {
    const res = await this.axiosRef.get(`${DEEZER_API.track}/${id}`)
    return res.data
  }

  async albums(page = 0, limit = 10) {
    const res = await this.axiosRef.get(`${DEEZER_API.albums}?limit=${limit}&index=${page * limit}`)
    return res.data
  }

  async album(id) {
    const res = await this.axiosRef.get(`${DEEZER_API.album}/${id}`)
    return res.data
  }

  async playlists(page = 0, limit = 10) {
    const res = await this.axiosRef.get(`${DEEZER_API.playlists}?limit=${limit}&index=${page * limit}`)
    return res.data
  }
}
