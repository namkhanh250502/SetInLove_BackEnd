import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as nodemailer from 'nodemailer';
import { FogotPass } from './dto/fogotPass.dto';
import { ChangePassDto } from './dto/changePass.dto';

@Injectable()
export class AccountService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(registerDto: RegisterDto): Promise<RegisterDto> {
    const original_username = await this.prisma.account.findFirst({
      where: {
        username: registerDto.username,
      },
    });

    if (original_username) {
      throw new ConflictException('Tên tài khoản đã tồn tại');
    }
    const original_email = await this.prisma.account.findFirst({
      where: {
        email: registerDto.email,
      },
    });
    if (original_email) {
      throw new ConflictException('Email đã tồn tại');
    }
    return await this.prisma.account.create({
      data: {
        username: registerDto.username,
        password: await bcrypt.hash(registerDto.password, 10),
        email: registerDto.email,
      },
    });
  }
  async login(loginDto: LoginDto): Promise<object> {
    const { username, password } = loginDto;
    const login_username = await this.prisma.account.findFirst({
      where: {
        username: username,
      },
    });
    if (!login_username) {
      throw new NotFoundException(
        'Tên tài khoản hoặc mật khẩu không chính xác!',
      );
    }

    const hashedPassword = await bcrypt.compare(
      password,
      login_username.password,
      );
    if (!hashedPassword) {
      throw new NotFoundException('Mật khẩu không chính xác');
    }
    const token = this.jwtService.sign(login_username, {
      secret: process.env.JWT_SECRET,
    });
    return { token };
  }

  async detailaccount(req: Request): Promise<object> {
    
   
    const accountID = this.jwtService.verify(
      req.headers.authorization.replace('Bearer ', ''),
      { secret: process.env.JWT_SECRET },
      );
      console.log('accountID 111: ', accountID);
    return this.prisma.account.findUnique({
      where: { id: Number(accountID.id) },
      include: {
        stories: {
          where: {
            id_account: Number(accountID.id),
          },
        },
      },
    });
  }

  async removeaccount(req: Request): Promise<object> {
    console.log('req: ', req);
    const accountID = this.jwtService.verify(
      req.headers.authorization.replace('Bearer ', ''),
      { secret: process.env.JWT_SECRET },
      );
      console.log('accountID: ', accountID);
    return this.prisma.account.delete({
      where: { id: Number(accountID.id) },
      include: {
        stories: {
          where: {
            id_account: Number(accountID.id),
          },
        },
      },
    });
  }

  async sendEmail(fogotPass: FogotPass): Promise<object> {
    function makeid(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
    }   
    const newpass = makeid(12);
    const to = await this.prisma.account.findFirst({where:{email: fogotPass.email}})
    if(to.email !== fogotPass.email) {
      throw new NotFoundException('Email chưa được đăng ký')
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: fogotPass.email,
      subject: 'Set In Love',
      html: `<pstyle="color: green">Mật khẩu mới của bạn là:</p>
          <h3><b>${newpass}</b></h3>`,
    };
    try {
      transporter.sendMail(mailOptions)
      return await this.prisma.account.update({
        where:{email:fogotPass.email},
        data:{password: await bcrypt.hash(newpass,10)}
      })
    } catch (error) {
      console.log('error: ', error);    
    }
  }

  async changePass(changePassDto: ChangePassDto,req: Request):Promise<object> {
    const {password, newpass} = changePassDto
    const original_account =await this.jwtService.verifyAsync(req.headers.authorization.replace("Bearer ",""),{secret: process.env.JWT_SECRET}) 
    const old_pass = await bcrypt.compare(password,original_account.password)
    if(!old_pass) {
      throw new BadRequestException('Mật khẩu cũ không chính xác')
    }
    return await this.prisma.account.update({
      where:{id:Number(original_account.id)} ,
      data:{
        password: await bcrypt.hash(newpass,10)
      }
    })
  }
}




