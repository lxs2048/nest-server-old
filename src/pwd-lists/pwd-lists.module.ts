import { Module } from '@nestjs/common';
import { PwdListsService } from './pwd-lists.service';
import { PwdListsController } from './pwd-lists.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PwdList } from './entities/pwd-list.entity';
@Module({
  imports: [TypeOrmModule.forFeature([PwdList])],
  controllers: [PwdListsController],
  providers: [PwdListsService],
})
export class PwdListsModule {}
