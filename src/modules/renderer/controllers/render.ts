import { Controller, Get, Inject } from '@core';
import { Request } from '@nestjs/common';
import { RenderService } from '@renderer/services/render';
import { Request as Req } from 'express';

@Controller()
export class RenderController {

    @Inject()
    protected readonly renderService: RenderService;

  @Get('/')
  async render(@Request() req: Req) {
    return await this.renderService.render(req.url);
  }
}