import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { Request } from 'express'
import { Observable } from 'rxjs'

dotenv.config()

@Injectable()
export class BlacklistedIpInterceptor implements NestInterceptor {
  private readonly blacklistedIps: string[]

  constructor() {
    this.blacklistedIps = process.env.BLACKLISTED_IPS.split(',')
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest()
    const header = request.get('x-forwarded-for')
    const clientIp = header ?? request.ip

    const isBlocked = this.blacklistedIps.includes(clientIp)
    console.log(`ip: ${clientIp}  isBlocked: ${isBlocked}`)

    if (isBlocked) {
      throw new HttpException(
        { statusCode: HttpStatus.TOO_MANY_REQUESTS, error: 'Too Many Requests', message: 'Rate limit exceeded.' },
        429,
      )
    }

    return next.handle()
  }
}
