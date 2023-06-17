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
      ttl: 1000 * 60 * 30, // 30 minutes
      max: 10000, // maximum number of items in cache
    }),

    // Rate limit module
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
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
