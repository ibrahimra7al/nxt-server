import { Controller, Get, Inject } from '@core';
import { Req } from '@nestjs/common';
import { RenderService } from '@renderer/services/render';
import { Request } from 'express';

@Controller()
export class RenderController {
  @Inject()
  protected readonly renderService: RenderService;

  @Get('/')
  async render(@Req() req: Request) {
    return await this.renderService.render(req.url);
  }
}
