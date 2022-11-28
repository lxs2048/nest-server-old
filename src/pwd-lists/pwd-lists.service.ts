import { Injectable } from '@nestjs/common';
import { CreatePwdListDto } from './dto/create-pwd-list.dto';
import { UpdatePwdListDto } from './dto/update-pwd-list.dto';

@Injectable()
export class PwdListsService {
  create(createPwdListDto: CreatePwdListDto) {
    return 'This action adds a new pwdList';
  }

  findAll() {
    return `This action returns all pwdLists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pwdList`;
  }

  update(id: number, updatePwdListDto: UpdatePwdListDto) {
    return `This action updates a #${id} pwdList`;
  }

  remove(id: number) {
    return `This action removes a #${id} pwdList`;
  }
}
