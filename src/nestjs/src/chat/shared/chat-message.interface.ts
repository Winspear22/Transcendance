import { ChatClient } from "./chat-client.interface";

export interface ChatMessage 
{
    message: string;
    sender: ChatClient;
}
