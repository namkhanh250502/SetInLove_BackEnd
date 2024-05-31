import { Module } from "@nestjs/common";
import { SocketGateway } from "./socket.gateway";
import { SocketController } from "./socket.controller";
import { SocketService } from "./socket.service";
import { PrismaService } from "src/prisma.service";


@Module({
    imports: [],
    controllers: [SocketController],
    providers:[SocketGateway,SocketService,PrismaService],
    exports:[]
})

export class SocketModule {} 