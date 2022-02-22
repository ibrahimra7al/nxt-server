import { Module } from '@core';
import { RenderController } from '@renderer/controllers/render';
import { RenderService } from '@renderer/services/render';
import { RenderDataService } from '@renderer/services/render-data';
import { ViewsService } from '@renderer/services/views';

@Module({
  imports: [],
  controllers: [RenderController],
  providers: [RenderService, RenderDataService, ViewsService],
})
export class RendererModule {}
