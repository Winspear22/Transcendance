import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatService } from './shared/chat.service';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { ChatClient } from './shared/chat-client';
import { ChatMessage } from './shared/chat-message';
import { debounceTime } from 'rxjs';

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
  unsubscribe$ = new Subject();
  
  nickNameFc = new FormControl();
  clients$: Observable<ChatClient[]> | undefined;
  error$: Observable<string> | undefined;

  clientsTyping: ChatClient[] = [];


  chatClient: ChatClient | undefined;
  ngOnInit(): void 
  {
    this.clients$ = this.chatService.listenForClients();
    this.error$ = this.chatService.listenForErrors();
    this.message.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(250)
      )
      .subscribe((value) => {
        this.chatService.sendTyping(value.length > 0);
      });
    console.log('Client\'s connection has been enabled');
        this.chatService.listenForMessages()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe( message => {console.log('hellooo'), this.messages.push(message);});
    console.log('Client\'s nickname is : ', this.nickNameFc.value);
    this.chatService.listenForClientTyping()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe((chatClient) => {
      if (chatClient.typing && !this.clientsTyping.find((c) => c.id === chatClient.id)) {
        this.clientsTyping.push(chatClient);
      } else {
        this.clientsTyping = this.clientsTyping.filter((c) => c.id !== chatClient.id);
      }
    });
    this.chatService.listenForWelcome()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe( welcome => {this.messages = welcome.messages; this.chatClient = this.chatService.chatClient = welcome.client;});
    if (this.chatService.chatClient)
      this.chatService.sendNickname(this.chatService.chatClient.nickname);
  }

  ngOnDestroy(): void
  {
    console.log('Client\'s connection has been destroyed');
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  sendMessage(): void 
  {
    console.log(this.message.value);
    this.chatService.sendMessage(this.message.value);
    this.message.patchValue('');
  }

  sendNickname(): void
  {
    if (this.nickNameFc.value)
      this.chatService.sendNickname(this.nickNameFc.value);

  }
}
