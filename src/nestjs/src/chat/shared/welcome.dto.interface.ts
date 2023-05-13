import { ChatClient } from "./chat-client.interface";
import { ChatMessage } from "./chat-message.interface";

export interface WelcomeDto
{
    clients: ChatClient[];
    client: ChatClient;
    messages: ChatMessage[];
}
