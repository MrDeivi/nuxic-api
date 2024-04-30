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

    // Rate limit module
    ThrottlerModule.forRoot([
      // 30 requests per minute
      {
        name: 'short',
        ttl: 1000 * 60,
        limit: 30,
      },
      // and 500 requests per hour
      {
        name: 'medium',
        ttl: 1000 * 60 * 60,
        limit: 500,
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
