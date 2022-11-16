import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{ name: 'TheEyesServer', text: 'Welcome'}, ];
  ClientToUser = {};

  identify(name: string, clientId: string){
    this.ClientToUser[clientId] = name;

    return Object.values(this.ClientToUser);
  }

  getClientName(clientId: string){
    return this.ClientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto, clientId: string) {
    const message = {   // inform client new msg
      name: this.ClientToUser[clientId],
      text: createMessageDto.text,
    }; 
    this.messages.push(message); // who join room || cannot chang e their name
    return message;
  }

  findAll() {
    return this.messages; // db query to get messages
  }
}
