import { Injectable } from '@nestjs/common';
import { ChatClient } from './chat-client.interface';
import { ChatMessage } from './chat-message.interface';

@Injectable()
export class ChatService 
{
    allMessages: ChatMessage[] = [];
    clients: ChatClient[] = [];

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
          chatClient = { id: id, nickname: nickname };
          this.clients.push(chatClient);
          return chatClient;
    }

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
