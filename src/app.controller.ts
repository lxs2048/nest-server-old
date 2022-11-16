import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('ABC') private readonly defg: AppService,
    @Inject('Test') private readonly demo: number[],
    @Inject('HiHi') private readonly hihi: string,
  ) {}

  @Get()
  getHello(): string {
    return this.hihi;
  }
}
