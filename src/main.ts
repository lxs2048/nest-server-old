import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: 'zhangsan',
      name: 'zhangsan.sid',
      rolling: true,
      cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
    }),
  );
  await app.listen(3000);
}
bootstrap();
