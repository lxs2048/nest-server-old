import { Test, TestingModule } from '@nestjs/testing';
import { PwdListsController } from './pwd-lists.controller';
import { PwdListsService } from './pwd-lists.service';

describe('PwdListsController', () => {
  let controller: PwdListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PwdListsController],
      providers: [PwdListsService],
    }).compile();

    controller = module.get<PwdListsController>(PwdListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
