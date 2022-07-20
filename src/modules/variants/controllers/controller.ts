import { Controller, Get, Inject } from '@core';
import { VariantsService } from '@variants/services/fetch';

@Controller('api')
export class VariantsController {
    
    @Inject()
    protected readonly variantsService: VariantsService;

    @Get('/variants')
    variants() {
      return this.variantsService.all();
    }
  
}