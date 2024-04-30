import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { DeezerModule } from './deezer/deezer.module'

@Module({
  imports: [
    DeezerModule,

    // Cache module to cache API requests
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 60 * 60, // 1 hour
      max: 10000, // maximum number of items in cache
    }),

    // Rate limit module 100 request per hour
    ThrottlerModule.forRoot([
      {
        ttl: 3600000,
        limit: 100,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
