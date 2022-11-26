import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import type { Request } from 'express';

export const Myrole = (...args: string[]) => SetMetadata('myrole', args);

export const ReqUrl = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log(data, '自定义参数');

    const req = ctx.switchToHttp().getRequest<Request>();
    return req.url;
  },
);
