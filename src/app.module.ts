import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { StoriesModule } from './stories/stories.module';
import { PrismaService } from './prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SocketModule } from './socket/socket.module';


@Module({
  imports: [
    AccountModule,
    StoriesModule,
    SocketModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
