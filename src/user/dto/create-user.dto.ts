import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 10, {
    message: 'username的长度不在4-10之间',
  })
  @ApiProperty({
    description: '用户名',
    example: 'zhangsan',
  })
  username: string;
  @IsNotEmpty()
  @IsString()
  @Length(4, 6, {
    message: 'code的长度不在4-6之间',
  })
  @ApiProperty({
    description: '验证码',
    example: 'abcd',
  })
  code: string;
}
