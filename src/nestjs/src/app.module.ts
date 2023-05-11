import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, AppService2 } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { My_ChatRoom } from './entities/chat_room.entity';
import { My_GameHistory } from './entities/game_history.entity';
import { My_Membership } from './entities/membership.entity';
import { My_Message } from './entities/message.entity';
import { My_Player } from './entities/player.entity';
import { My_Relation } from './entities/relation.entity';
import { ChatModule } from './chat/chat.module';
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
      entities: [My_Player, My_Message, My_ChatRoom, My_GameHistory, My_Membership, My_Relation],
      synchronize: true, // Garder à 'false' en production
  }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppService2],
})
export class AppModule {}
