import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import * as cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ResponseInterceptor } from './common/response';
import { FilterInterceptor } from './common/filter';
const prisonLists = ['/list'];
function middlewareAll(req: Request, res: Response, next: NextFunction) {
  console.log(req.url);
  if (prisonLists.includes(req.url)) {
    res.send({ message: '这小子进小黑屋了' });
  } else {
    next();
  }
}
const whitelists = ['https://www.baidu.com'];
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin, whitelists.indexOf(origin));
    if (whitelists.indexOf(origin) !== -1) {
      console.log('通过');

      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/zhangsan',
  });
  // app.use(cors()); // 允许所有跨域
  app.use(cors(corsOptions));
  app.use(middlewareAll);
  app.use(
    session({
      secret: 'zhangsan',
      name: 'zhangsan.sid',
      rolling: true,
      cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new FilterInterceptor());
  await app.listen(3000);
}
bootstrap();
