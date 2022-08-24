import { Controller, Post, Req, Inject } from '@core';
import { RenderService } from '@renderer/services/render';
import { Request } from 'express';

@Controller()
export class RenderController {
  @Inject()
  protected readonly renderService: RenderService;

  @Post('/')
  async render(@Req() req: Request) {
   const isNXTStoryBookServer = Boolean(req.headers['x-nxt-story-server'])
    return await this.renderService.render(
      isNXTStoryBookServer ? '/iframe.html' : req.url,
      req.body.dropzones,
      req.body.pages,
      req.body.boilerplate,
    );
  }
}
