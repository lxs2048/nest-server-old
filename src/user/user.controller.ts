import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Request,
  Query,
  Headers,
  HttpCode,
  Redirect,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({
  path: 'user',
  version: '1', // 升级版本
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body) {
    console.log(body);
    return {
      code: 200,
      message: body.name,
    };
  }

  @Get()
  @HttpCode(500)
  @Redirect('/34')
  findAll(@Query() query, @Headers() headers) {
    console.log(headers);
    return {
      code: 200,
      message: query.name,
    };
  }

  @Get(':id')
  @Version('2')
  findOne(@Param('id') id: string) {
    console.log(id);
    return {
      code: 200,
      message: id,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
