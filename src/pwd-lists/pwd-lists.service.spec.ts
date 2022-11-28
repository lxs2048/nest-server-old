import { Test, TestingModule } from '@nestjs/testing';
import { PwdListsService } from './pwd-lists.service';

describe('PwdListsService', () => {
  let service: PwdListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PwdListsService],
    }).compile();

    service = module.get<PwdListsService>(PwdListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
