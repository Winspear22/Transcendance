import { Injectable } from '@nestjs/common';
import { ChatClient } from './chat-client.interface';
import { ChatMessage } from './chat-message.interface';
import { My_Player } from 'src/entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService 
{
    allMessages: ChatMessage[] = [];
    clients: ChatClient[] = [];

    constructor(
      @InjectRepository(My_Player)
      private clientRepository: Repository<My_Player>
    ) {}
    addMessage(message: string, clientId: string): ChatMessage
    {
        const client = this.clients.find(c => c.id === clientId);
        const ChatMessage: ChatMessage = { message: message, sender: client };
        this.allMessages.push(ChatMessage);
        return ChatMessage;
    }

    addClients(id: string, nickname: string): ChatClient
    {
        let chatClient = this.clients.find(
            (c) => c.nickname === nickname && c.id === id,
          );
          if (chatClient) 
          {
            console.log('JE SUIS ICI 1');
            return chatClient;
          }
          if (this.clients.find((c) => c.nickname === nickname)) 
          {
            console.log('JE SUIS ICI 2');
            throw new Error('Nickname already used!');
          }
          console.log('JE SUIS ICI 3');
          //chatClient = { id: id, nickname: nickname };
          //this.clients.push(chatClient);
          let client = this.clientRepository.create();
          client.nickname = nickname;
          client.id = id;
          this.clientRepository.save(client);
          return chatClient;
    }
    /*async addClient(chatClient: ChatClient): Promise<ChatClient> {
      const chatClientFoundById = await this.clientRepository.findOne({id: chatClient.id});
      if(chatClientFoundById) {
        return JSON.parse(JSON.stringify(chatClientFoundById));
      }
      const chatClientFoundByNickname = await this.clientRepository.findOne({nickname: chatClient.nickname});
      if(chatClientFoundByNickname) {
        throw new Error('Nickname already used!');
      }
      let client = this.clientRepository.create();
      client.nickname = chatClient.nickname;
      client = await this.clientRepository.save(client);
      const newChatClient = JSON.parse(JSON.stringify(client));
      this.clients.push(newChatClient);
      return newChatClient;
    }*/

    getClients(): ChatClient[]
    {
        return this.clients;
    }

    getMessages(): ChatMessage[]
    {
        return this.allMessages;
    }

    deleteClients(id: string): void
    {
        this.clients = this.clients.filter(c => c.id !== id);
    }

    updateTyping(typing: boolean, id: string): ChatClient {
        const chatClient = this.clients.find((c) => c.id === id);
        if (chatClient && chatClient.typing !== typing) {
          chatClient.typing = typing;
          return chatClient;
        }
    }
}
