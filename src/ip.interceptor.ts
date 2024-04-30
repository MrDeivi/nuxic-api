import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ForbiddenException, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

@Injectable()
export class BlacklistedIpInterceptor implements NestInterceptor {
  private readonly blacklistedIps: string[]

  constructor() {
    this.blacklistedIps = process.env.BLACKLISTED_IPS.split(',')
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest()
    console.log(request.rawHeaders)
    const header = request.get('x-forwarded-for')
    const clientIp = header ?? request.ip

    const isBlocked = this.blacklistedIps.includes(clientIp)
    console.log(`ip: ${clientIp}  isBlocked: ${isBlocked}`)

    if (isBlocked) {
      throw new ForbiddenException('Access Denied')
    }

    return next.handle()
  }
}
