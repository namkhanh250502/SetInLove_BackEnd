import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import {Request} from 'express'


@Injectable()
export class AccountService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async register(registerDto: RegisterDto):Promise<RegisterDto> {
        const origin_username = await this.prisma.account.findFirst({
            where:{
                username:registerDto.username
            }})
            
        if(origin_username) {
            throw new ConflictException('Tên tài khoản đã tồn tại')
        }
        const origin_email = await this.prisma.account.findFirst({
            where:{
                email: registerDto.email
            }})
        if(origin_email) {
            throw new ConflictException('Email đã tồn tại')
        }
        return await this.prisma.account.create({
            data:{
                username: registerDto.username,
                password: await bcrypt.hash(registerDto.password,10)  ,
                email: registerDto.email
            }
        })
    }
    async login(loginDto: LoginDto):Promise<object> {
        const {username,password} = loginDto
        const login_username = await this.prisma.account.findFirst({
            where:{
                username: username
        }
        })
        if(!login_username) {
            throw new NotFoundException('Tên tài khoản hoặc mật khẩu không chính xác!')
        }

        const hashedPassword = await bcrypt.compare(
            password,login_username.password
            )
        if(!hashedPassword) {
            throw new NotFoundException('Mật khẩu không chính xác')
        }
        const token =  this.jwtService.sign(login_username,{secret:process.env.JWT_SECRET})
        return{ token}
    }

    async detailaccount(req:Request):Promise<object> {
        const accountID = this.jwtService.verify(
            req.rawHeaders[1].replace('Bearer ', ''),
            { secret: process.env.JWT_SECRET })
        return this.prisma.account.findUnique({
            where:{id: Number(accountID.id)},
            include:{
                stories:{
                    where:{
                        id_account:Number(accountID.id)
                    }
                }
            }
        })
    }

    async removeaccount(req:Request):Promise<object> {
        const accountID = this.jwtService.verify(
            req.rawHeaders[1].replace('Bearer ', ''),
            { secret: process.env.JWT_SECRET })
        return this.prisma.account.delete({
            where:{id: Number(accountID.id)},
            include:{
                stories:{
                    where:{
                        id_account:Number(accountID.id)
                    }
                }
            }
        })
    }

  
    
}
