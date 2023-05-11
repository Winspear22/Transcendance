import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';

@WebSocketGateway( {cors: true} )
export class ChatGateway
{
    @SubscribeMessage('message')
    handleChatEvent(@MessageBody() data: string): string 
    {
        console.log(data);
        return data + ' Hello';
    }   
}