import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

@Injectable()
export class MyroleGuard implements CanActivate {
  constructor(private Reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const admin = this.Reflector.get<string[]>('myrole', context.getHandler());
    const request = context.switchToHttp().getRequest<Request>();
    console.log('经过了守卫', admin, request.query);
    if (admin?.includes(request?.query?.myrole as string)) {
      return true;
    } else {
      return false;
    }
  }
}
