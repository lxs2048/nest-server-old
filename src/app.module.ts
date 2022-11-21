import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DemoService } from './demo.service';
import { ListModule } from './list/list.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { SpiderModule } from './spider/spider.module';
@Module({
  imports: [
    UserModule,
    ListModule,
    ConfigModule.AAA({
      prefix: 'hihihi',
    }),
    UploadModule,
    SpiderModule,
  ],
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
