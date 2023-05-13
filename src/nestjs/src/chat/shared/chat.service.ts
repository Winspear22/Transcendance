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

    addClients(id: string, nickname: string): void
    {
        this.clients.push({id: id, nickname: nickname});
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
}
