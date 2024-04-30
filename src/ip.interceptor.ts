import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ForbiddenException } from '@nestjs/common'
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
    const clientIp = request.ip

    if (this.blacklistedIps.includes(clientIp)) {
      throw new ForbiddenException('Access Denied')
    }

    return next.handle()
  }
}
