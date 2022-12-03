import { Injectable } from '@nestjs/common';
import { CreatePwdListDto } from './dto/create-pwd-list.dto';
import { UpdatePwdListDto } from './dto/update-pwd-list.dto';

import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PwdList } from './entities/pwd-list.entity';
@Injectable()
export class PwdListsService {
  constructor(
    @InjectRepository(PwdList) private readonly pwdLists: Repository<PwdList>,
  ) {}

  create(createPwdListDto: CreatePwdListDto) {
    const data = new PwdList();
    data.website = createPwdListDto.website;
    data.username = createPwdListDto.username;
    data.password = createPwdListDto.password;
    return this.pwdLists.save(data);
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const queryData = {};
    if (query.keyWord) {
      queryData['where'] = { website: Like(`%${query.keyWord}%`) };
    }
    if (query.page && query.pageSize) {
      queryData['skip'] = (query.page - 1) * query.pageSize;
      queryData['take'] = query.pageSize;
    }
    const [records, total] = await this.pwdLists.findAndCount({
      order: {
        id: 'DESC',
      },
      ...queryData,
    });
    return {
      records,
      total,
    };
  }

  findOne(id: number) {
    console.log(111);
    
    return this.pwdLists.findOneBy({
      id: id,
    });
  }

  update(id: number, updatePwdListDto: UpdatePwdListDto) {
    return this.pwdLists.update(id, updatePwdListDto);
  }

  remove(id: number) {
    return this.pwdLists.delete(id);
  }
}
