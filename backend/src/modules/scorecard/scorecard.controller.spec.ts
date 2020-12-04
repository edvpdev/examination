import { Test, TestingModule } from '@nestjs/testing';
import { ScorecardController } from './scorecard.controller';

describe('ScorecardController', () => {
  let controller: ScorecardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScorecardController],
    }).compile();

    controller = module.get<ScorecardController>(ScorecardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
