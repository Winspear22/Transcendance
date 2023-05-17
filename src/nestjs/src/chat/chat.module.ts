import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './shared/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { My_Player } from 'src/entities/player.entity';

@Module({
    imports: [TypeOrmModule.forFeature([My_Player])],
    providers: [ChatGateway, ChatService],
})
export class ChatModule {}
