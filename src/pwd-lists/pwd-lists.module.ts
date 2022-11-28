import { Module } from '@nestjs/common';
import { PwdListsService } from './pwd-lists.service';
import { PwdListsController } from './pwd-lists.controller';

@Module({
  controllers: [PwdListsController],
  providers: [PwdListsService]
})
export class PwdListsModule {}
