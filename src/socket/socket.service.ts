import { Injectable, OnModuleInit } from "@nestjs/common";
import { Socket, io } from "socket.io-client";
import { PrismaService } from "src/prisma.service";
import { SOCKET_EVENT } from "./utils/utils";


@Injectable()
export class SocketService  {
    public socketClient: Socket

    constructor(
        // prismaService: PrismaService
        
    ) {
        // this.socketClient = io('http://localhost:3002')
    }
  
  

    
}