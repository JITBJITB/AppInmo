import { Test, TestingModule } from '@nestjs/testing';
import { PostSalesService } from './post-sales.service';

describe('PostSalesService', () => {
  let service: PostSalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostSalesService],
    }).compile();

    service = module.get<PostSalesService>(PostSalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
