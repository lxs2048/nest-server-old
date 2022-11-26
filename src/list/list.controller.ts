import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('==list==')
@Controller('list')
export class ListController {
  constructor(
    private readonly listService: ListService,
    @Inject('Config') private readonly config: any,
  ) {}

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    console.log(typeof id);
    return this.listService.findOne(+id);
  }

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @Get()
  findAll() {
    console.log(this.config);

    return this.config.salt;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
