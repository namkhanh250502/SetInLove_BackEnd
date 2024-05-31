import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { SocketService } from './socket.service';
import { EventTypes, SOCKET_EVENT } from './utils/utils';
// import { SocketService } from './socket.service';

@WebSocketGateway({
    cors: {
        origin: ['http://localhost:3000']
    }
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    private readonly logger = new Logger(SocketGateway.name);


    @WebSocketServer() server: Server
    constructor(
        private readonly socketSV: SocketService
    ) { }

    afterInit(server: Server) {
        this.logger.log('Khởi tạo socket')
        this.server.on('connect', (socket) => {
            console.log(socket.id);
            console.log('Connected');
        })
    }

    handleConnection(client: Socket) {
        const query = client.handshake.query
        this.logger.log('query: ', query)
        if (query.name && query.type) this.logger.log(`Kết nối client: ${query.type}:${query.name}`)
    }

    handleDisconnect(client: Socket) {

    }

    @SubscribeMessage(EventTypes.BookingChat)
    createBookingChat(client: Socket, msg: {sender: string, room:string, message: string}) {
        this.server.to(msg.room).emit(SOCKET_EVENT.NEW_MESSAGE, msg)
    }

    @SubscribeMessage(SOCKET_EVENT.JOIN_ROOM_CHAT)
    joinRoom(client: Socket, room: string) {
        client.join(room)
    }

    @SubscribeMessage(SOCKET_EVENT.LEAVE_BOOKING_CHAT)
    leaveRoom(client: Socket, room: string) {
        client.leave(room)
    }



}   

