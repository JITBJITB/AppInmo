import { Test, TestingModule } from '@nestjs/testing';
import { PostSalesController } from './post-sales.controller';

describe('PostSalesController', () => {
  let controller: PostSalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostSalesController],
    }).compile();

    controller = module.get<PostSalesController>(PostSalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
