import { CACHE_MANAGER } from '@nestjs/cache-manager'
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Cache } from 'cache-manager'
import * as dotenv from 'dotenv'
import { Request } from 'express'
import { Observable } from 'rxjs'

dotenv.config()

const REQUEST_LIMIT = parseInt(`${process.env.REQUEST_LIMIT ?? 50}`)

@Injectable()
export class BlacklistedIpInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest()
    const header = request.get('x-forwarded-for')
    const clientIp = header ?? request.ip

    const { success, count } = await rateLimitRequest(clientIp, this.cacheManager)
    console.log(`ip: ${clientIp}  isBlocked: ${!success} count: ${count}`)

    if (!success) {
      throw new HttpException(
        { statusCode: HttpStatus.TOO_MANY_REQUESTS, error: 'Too Many Requests', message: 'Rate limit exceeded.' },
        429,
      )
    }

    return next.handle()
  }
}

export async function rateLimitRequest(ip: string, cacheManager) {
  if (!ip) return { success: false }

  const { success, count } = await limit(ip, cacheManager)

  console.log(`isBlocked: ${!success} ip: ${ip} count: ${count}`)

  const error = success
    ? null
    : new Response('You have reached your request limit.', {
        status: 429,
      })

  return { success, error, count }
}

const blackList: string[] = []

async function limit(ip: string | undefined, cacheManager: Cache): Promise<{ success: boolean; count?: number }> {
  if (!ip) return { success: false }

  const requests: number = (await cacheManager.get(ip)) ?? 0
  if (requests > REQUEST_LIMIT) blackList.push(ip)

  cacheManager.set(ip, requests + 1)

  return { success: !blackList.includes(ip), count: requests }
}
