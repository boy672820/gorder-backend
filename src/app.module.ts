import { Module } from '@nestjs/common';
import { CoreModule } from '@core/module';
import { AuthModule, ProductModule } from '@app';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CoreModule, AuthModule, ProductModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
