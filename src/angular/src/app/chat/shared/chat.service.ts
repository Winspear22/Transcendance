import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

/*===========================================================================================*/
/*-------------------------A QUOI SERT LE FICHIER CHAT.SERVICE.TS ?--------------------------*/
/*===========================================================================================*/
/*-----------------------------A QUOI SERT UN SERVICE DE BASE ?------------------------------*/
/*Un service dans Angular est une classe TypeScript destinée à être utilisée par d'autres 
classes (comme les composants, mais aussi d'autres services) pour effectuer des tâches 
spécifiques, Les services sont injectés dans les composants (ou d'autres services), 
Cela signifie que lorsque vous créez un composant, Angular crée automatiquement une instance
des services dont le composant a besoin et les fournit au composant */
/*---------------------------------A QUOI SERT CELUI-CI ?------------------------------------*/
/*Ce service est une couche d'abstraction autour de la bibliothèque Socket.IO, qui est utilisée 
pour la communication en temps réel avec le serveur. Il fournit des méthodes pour envoyer des 
messages au serveur, écouter de nouveaux messages du serveur, et gérer la connexion avec le 
serveur.*/
/*===========================================================================================*/

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  /*--------------MESSAGE MANAGEMENT--------------*/
  constructor(private socket: Socket) { }
  sendMessage(msg: string): void 
  {
    this.socket.emit('message', msg);
  }

  getAllMessages(): Observable<string[]>
  {
    return this.socket
    .fromEvent<string[]>('allMessages');

  }

  listenForMessages(): Observable<string>
  {
    return this.socket
    .fromEvent<string>('newMessage');

  }

  /*--------------NICKNAME MANAGEMENT--------------*/
  sendNickname(nickname: string): void
  {
    this.socket.emit('nickname', nickname);
  }

  listenForClients(): Observable<string[]>
  {
    return this.socket
    .fromEvent<string[]>('clients');
  }



  /*--------------CONNECTION MANAGEMENT--------------*/
  disconnect(): void 
  {
    this.socket.disconnect();
  }

  connect(): void 
  {
    this.socket.connect();
  }
}
