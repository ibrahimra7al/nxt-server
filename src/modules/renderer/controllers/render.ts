import { Controller, Post, Req, Inject } from '@core';
import { RenderService } from '@renderer/services/render';
import { Request } from 'express';

@Controller()
export class RenderController {
  @Inject()
  protected readonly renderService: RenderService;

  @Post('/')
  async render(@Req() req: Request) {
    return await this.renderService.render(
      req.url,
      req.body.dropzones,
      req.body.pages,
      req.body.boilerplate,
    );
  }
}
