import { Logger } from '@nestjs/common';
import { 
  SubscribeMessage, 
  WebSocketGateway, 
  OnGatewayInit, 
  WsResponse, 
  OnGatewayConnection, 
  OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io'

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('initialized!');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected:    ${client.id}`);
  } 

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    console.log(text);
    return { event: 'msgToClient', data: text };
  }

  @SubscribeMessage('abc')
  handleMessage2(client: Socket, text: string): WsResponse<string> {
    console.log(text);
    return { event: 'msgToClient', data: "hooo!" };
  }

}
