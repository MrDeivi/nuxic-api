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

    // Rate limit
    ThrottlerModule.forRoot([
      // 60 requests per minute
      {
        name: 'short',
        ttl: 1000 * 60,
        limit: 30,
      },
      // and 1000 requests per day
      {
        name: 'large',
        ttl: 1000 * 60 * 60 * 24,
        limit: 1000,
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
