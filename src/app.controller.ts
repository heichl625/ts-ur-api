import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { OpenaiService } from './openai/openai.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private openaiService: OpenaiService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('models')
  getModels() {
    return this.openaiService.listModels()
  }

  @Get('chat')
  chat(){
    return this.openaiService.chat()
  }
}
