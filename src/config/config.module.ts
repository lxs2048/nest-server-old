import { DynamicModule, Global, Module } from '@nestjs/common';
interface Options {
  prefix: string;
}
@Global()
@Module({})
export class ConfigModule {
  static AAA(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: {
            salt: options.prefix + 'hello1',
          },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: {
            salt: options.prefix + 'hello2',
          },
        },
      ],
    };
  }
}
