import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';



@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      signOptions:{
        expiresIn:'1m'
      }
    })
  ],
  providers: [AccountService,PrismaService,JwtService,JwtStrategy,],
  controllers: [AccountController]
})
export class AccountModule {}
