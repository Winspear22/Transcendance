import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, AppService2 } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Player } from './entities/player.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'postgresql',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Player],
      synchronize: true, // Mettez cela à 'false' en production
  }),
  ],
  controllers: [AppController],
  providers: [AppService, AppService2],
})
export class AppModule {}
