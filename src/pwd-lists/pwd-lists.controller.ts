import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PwdListsService } from './pwd-lists.service';
import { CreatePwdListDto } from './dto/create-pwd-list.dto';
import { UpdatePwdListDto } from './dto/update-pwd-list.dto';

@Controller('pwd-lists')
export class PwdListsController {
  constructor(private readonly pwdListsService: PwdListsService) {}

  @Post()
  create(@Body() createPwdListDto: CreatePwdListDto) {
    return this.pwdListsService.create(createPwdListDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.pwdListsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pwdListsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePwdListDto: UpdatePwdListDto) {
    return this.pwdListsService.update(+id, updatePwdListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pwdListsService.remove(+id);
  }
}
