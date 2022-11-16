import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DemoService } from './demo.service';
import { ListModule } from './list/list.module';

@Module({
  imports: [UserModule, ListModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'ABC',
      useClass: AppService,
    },
    {
      provide: 'Test',
      useValue: [1, 2, 3], //任意类型
    },
    DemoService,
    {
      provide: 'HiHi',
      inject: [DemoService],
      async useFactory(DemoService: DemoService) {
        return await new Promise((r) => {
          setTimeout(() => {
            r(DemoService.getHello());
          }, 2000);
        });
      },
    },
  ],
})
export class AppModule {}
