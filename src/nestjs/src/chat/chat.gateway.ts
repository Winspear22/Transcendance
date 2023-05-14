import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './shared/chat.service';
import { WelcomeDto } from './shared/welcome.dto.interface';

/*===========================================================================================*/
/*-------------------------A QUOI SERT LE FICHIER CHAT.GATEWAY.TS ?--------------------------*/
/*===========================================================================================*/
/*Chat.gateway.ts sert de pont entre différentes parties du site. Le fichier est notamment lié 
à chat.component.ts.
Il fait le lien entre le front-end et le back-end et en l'état, il sert à écouter les string 
que les users écrivent sur le front end et attérissent dans le back-end grâce à la 
classe ChatGateway. Pour ce faire, ChatGateway utilise des Websocket provenant de la 
bibliothèque socket.io. il s'agit d'un protocole de communication qui fournit un 
canal de communication bidirectionnel et en temps réel  entre un client et un serveur. 
Une fois qu'une connexion WebSocket est établie, elle reste ouverte jusqu'à ce que 
le client ou le serveur décide de la fermer. Contrairement au protocole HTTP où le client 
initie toujours la communication, les WebSockets permettent au serveur d'envoyer des données 
au client  à tout moment et vice-versa.Cela est très utile pour notre PONG*/
/*===========================================================================================*/


@WebSocketGateway( {cors: true} ) //imperatif pour que le dialogue cross (cors) se fasse entre nesjt et angular
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect
{
    constructor(private chatService: ChatService) {}

    @WebSocketServer() server;
    @SubscribeMessage('message')
    handleChatEvent(@MessageBody() message: string, @ConnectedSocket() client: Socket): void 
    {
        const chatMessage = this.chatService.addMessage(message, client.id);
        this.server.emit('newMessage', chatMessage); //ici le server websocket envoie les messages qu'il reçoit à tous les clients qui sont connectés
    }

    handleConnection(client: Socket, ...args: any[]): any
    {
        client.emit('allMessages', this.chatService.getMessages()); //Lorsque le client se connecte, on lui envoie à LUI tous les messages précédant
        this.server.emit('clients', Array.from(this.chatService.getClients()));
    }

    handleDisconnect(client: Socket): any
    {
        this.chatService.deleteClients(client.id);
        this.server.emit('clients', Array.from(this.chatService.getClients()));
    }

    @SubscribeMessage('nickname')
    handleNicknameEvent(
    @MessageBody() nickname: string,
    @ConnectedSocket() client: Socket): void 
    {
        try 
        {
            const chatClient = this.chatService.addClients(client.id, nickname);
            const welcome: WelcomeDto = { clients: this.chatService.getClients(),
            messages: this.chatService.getMessages(), client: chatClient };
            client.emit('welcome', welcome);
            this.server.emit('clients', Array.from(this.chatService.getClients()));
        }
        catch (e)
        {
            client.emit('error', e.message);
        }
    }

    @SubscribeMessage('typing')
    handleTypingEvent(
      @MessageBody() typing: boolean,
      @ConnectedSocket() client: Socket,
    ): void {
      const chatClient = this.chatService.updateTyping(typing, client.id);
      if (chatClient) {
        this.server.emit('clientTyping', chatClient);
      }
    }
}