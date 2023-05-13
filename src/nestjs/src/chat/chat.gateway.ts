import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

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
    allMessages: string[] = [];
    clients: Map<string, string> = new Map<string, string>();
    @WebSocketServer() server;
    @SubscribeMessage('message')
    handleChatEvent(@MessageBody() message: string): string 
    {
        console.log(message);
        this.allMessages.push(message);
        this.server.emit('newMessage', message); //ici le server websocket envoie les messages qu'il reçoit à tous les clients qui sont connectés
        return message + ' Hello'; // le return sert à renvoyé son message au client l'ayant émis, de cette manière tlmd reçoit le message y compris celui qui l'a émis
    }

    //Cette fonction sert à inscrire dans le terminal l'ID du client qui vient de se connecter.
    //Elle sert également à lui envoyé tous les messages précédemment émis.
    handleConnection(client: Socket, ...args: any[]): any
    {
        console.log('Client n° connected : ', client.id);
        client.emit('allMessages', this.allMessages); //Lorsque le client se connecte, on lui envoie à LUI tous les messages précédant
    }

    //Cette fonction sert à inscrire dans le terminal l'ID du client qui vient de se déconnecter.
    handleDisconnect(client: Socket): any
    {
        this.clients.delete(client.id);
        console.log('Client n° disconnected : ', this.clients);

    }

    @SubscribeMessage('nickname')

    handleNicknameEvent(@MessageBody() nickname: string,
    @ConnectedSocket() client: Socket): void 
    {
        this.clients.set(client.id, nickname);
        console.log('Client\'s ID are : ', this.clients);
        this.server.emit('clients', Array.from(this.clients.values()));
    }
}