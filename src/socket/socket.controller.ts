import { Controller } from "@nestjs/common";
import { SocketService } from "./socket.service";


@Controller()
export class SocketController {
  private socketSv: SocketService
}