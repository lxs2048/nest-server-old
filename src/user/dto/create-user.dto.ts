import { IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 10, {
    message: 'username的长度不在4-10之间',
  })
  username: string;
  @IsNotEmpty()
  @IsString()
  @Length(4, 6, {
    message: 'code的长度不在4-6之间',
  })
  code: string;
}
