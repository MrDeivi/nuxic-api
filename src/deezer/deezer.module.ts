import { HttpModule } from '@nestjs/axios'
import { DeezerController } from './deezer.controller'
import { DeezerService } from './deezer.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [HttpModule],
  controllers: [DeezerController],
  providers: [DeezerService],
})
export class DeezerModule {}
