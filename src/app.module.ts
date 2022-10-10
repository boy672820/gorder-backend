import { Module } from '@nestjs/common';
import { CoreModule } from '@core/module';
import { AuthModule, ProductModule, OrderModule } from '@app';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CoreModule, AuthModule, ProductModule, OrderModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
