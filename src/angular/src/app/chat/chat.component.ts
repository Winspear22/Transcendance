import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatService } from './shared/chat.service';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { ChatClient } from './shared/chat-client';
import { ChatMessage } from './shared/chat-message';

/*===========================================================================================*/
/*------------------------A QUOI SERT LE FICHIER CHAT.COMPONENT.TS ?-------------------------*/
/*===========================================================================================*/
/*----------------------------A QUOI SERT UN COMPONENT DE BASE ?-----------------------------*/
/*Un composant dans Angular est une classe TypeScript qui contrôle une partie de l'affichage 
de la page appelée vue, il est composé d'une page html, css et ts (celle-ci)*/
/*---------------------------------A QUOI SERT CELUI-CI ?------------------------------------*/
/*Ce composant gère la partie utilisateur de la fonctionnalité de chat. Il est responsable de 
la récupération des messages du service, de l'affichage de ces messages à l'utilisateur, et de 
l'envoi de nouveaux messages saisis par l'utilisateur.*/
/*===========================================================================================*/

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy 
{
  constructor(private chatService: ChatService) {}

  message = new FormControl();
  messages: ChatMessage[] = [];
  unsubscriber$ = new Subject();
  
//  nickname: string | undefined;
  nickNameFc = new FormControl();
  clients$: Observable<ChatClient[]> | undefined;

  chatClient: ChatClient | undefined;
  ngOnInit(): void 
  {
    this.clients$ = this.chatService.listenForClients();
    console.log('Client\'s connection has been enabled');
    this.chatService.listenForMessages()
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe( message => {console.log('hellooo'), this.messages.push(message);});
    //this.chatService.getAllMessages()
    //  .pipe(take(1))
    //  .subscribe( messages => {console.log('hellooo'); this.messages = messages;});
      this.chatService.connect();
  }

  ngOnDestroy(): void
  {
    console.log('Client\'s connection has been destroyed');
    this.unsubscriber$.next(true);
    this.unsubscriber$.complete();
    this.chatService.disconnect();
  }

  sendMessage(): void 
  {
    console.log(this.message.value);
    this.chatService.sendMessage(this.message.value);
  }

  sendNickname(): void
  {
    if (this.nickNameFc.value)
    {
      console.log('Client\'s nickname is : ', this.nickNameFc.value);
      //this.nickname = this.nickNameFc.value;
      this.chatService.listenForWelcome()
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe( welcome => {this.messages = welcome.messages; this.chatClient = welcome.client;});

      this.chatService.sendNickname(this.nickNameFc.value);
    }

  }
}
