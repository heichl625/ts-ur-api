import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { OpenaiService } from './openai/openai.service';

@Module({
  imports: [OpenaiModule],
  controllers: [AppController],
  providers: [AppService, OpenaiService],
})
export class AppModule {}
