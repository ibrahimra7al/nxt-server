import { Module } from '@core';
import { VariantsController } from '@variants/controllers/controller';
import { VariantsService } from './services/fetch';

@Module({
  imports: [],
  controllers: [VariantsController],
  providers: [VariantsService],
})
export class VariantModule {}
