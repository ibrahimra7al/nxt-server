import { Module } from '@core';
import { RendererModule } from '@renderer';
import { VariantModule } from '@variants';
@Module({
  imports: [RendererModule, VariantModule],
  controllers: [],
  providers: [],
})
export class PrimaryModule {}
