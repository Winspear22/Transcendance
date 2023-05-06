import { Controller, Get } from '@nestjs/common';
import { AppService, AppService2 } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appService2: AppService2,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello2')
  getHello2(): string
  {
    return this.appService2.getHello2();
  }
}
