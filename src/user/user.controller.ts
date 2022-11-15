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
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as svgCaptcha from 'svg-captcha';
@Controller({
  path: 'user',
  version: '1', // 升级版本
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('code')
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    req.session.code = captcha.text; //存储验证码记录到session
    console.log(req.session.code);
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
  @Post('create')
  createUser(@Session() session, @Body() body) {
    console.log(session, body);
    if (
      session.code &&
      session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()
    ) {
      return {
        message: '验证码正确',
      };
    } else {
      return {
        message: '验证码错误',
      };
    }
  }

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
