import { PartialType } from '@nestjs/swagger';
import { CreatePwdListDto } from './create-pwd-list.dto';

export class UpdatePwdListDto extends PartialType(CreatePwdListDto) {}
