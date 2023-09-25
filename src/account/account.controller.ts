import { Body, Controller, Delete, Get, Header, Headers, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { RegisterDto } from './dto/register.dto';
import { Response,Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { StoriesGuard } from 'src/stories/stories.guard';
import { FogotPass } from './dto/fogotPass.dto';
import { async } from 'rxjs';
import { ChangePassDto } from './dto/changePass.dto';




@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    //APi đăng kí
    @Post('register')
    async register(@Body() registerDto: RegisterDto, @Res() res: Response,@Req() req:Request):Promise<object> {
       
        try {
            const result = await this.accountService.register(registerDto)
            delete result.password
            console.log('result: ', result);
            return res.status(200).json({
                status:'Ok!',
                message: 'Đăng kí thành công',
                result: result
            })
        } catch (error) {
            console.log('error: ', error);
            return res.status(500).json({
                status:'Err!',
                message: 'Đăng kí thất bại'
            })
        }
    }
    
    //API đăng nhập
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response):Promise<object> {
        try {
            const result = await this.accountService.login(loginDto)
            console.log('result: ', result);
            return res.status(200).json({
                status:'Ok!',
                message:'Đăng nhập thành công',
                result: result
            })
        } catch (error) {
            console.log('error: ', error);
            return res.status(500).json({
                status:'Err!',
                message:'Đăng nhập thất bại'
            })
        }
    }

    //API đọc dữ liệu người dùng
    @Get('detail-account')
    @Header('Cache-Control', 'none')
    @UseGuards(StoriesGuard)
    async detailaccount(@Req() req: Request,@Res() res: Response):Promise<object> {
        console.log('res 11: ', req);
    
        try {
            const result = await this.accountService.detailaccount(req)
            console.log('result: ', result);
            return res.status(200).json({
                status:'Ok!',
                message:'Đọc dữ liệu thành công',
                result: result
            })
            
        } catch (error) {
            console.log('error: ', error.message);
            return res.status(500).json({
                status:'Err!',
                message:'Không thể đọc dữ liệu'
            })
        }
    }

    //API xóa tài khoản người dùng
    @Delete('remove-account')
    @UseGuards(StoriesGuard)
    async removeaccount(@Req() req: Request,@Res() res: Response):Promise<object> {
        try {
            const result = await this.accountService.removeaccount(req)
            return res.status(200).json({
                status:'Ok!',
                message:'Xóa tài khoản thành công',
                result: result
            })
            
        } catch (error) {
            console.log('error: ', error);
            return res.status(500).json({
                status:'Ok!',
                message:'Xóa tài khoản thất bại'
            })
        }
    }

    //API quên mật khẩu
    @Get('fogot-password')
    async sendEmail(@Req() req: Request,@Res() res: Response,@Body() fogotPass: FogotPass):Promise<object> {

      try {
        const result = await this.accountService.sendEmail(fogotPass);
        return res.status(200).json({
            status:'Ok!',
            message: 'Email đã được gửi thành công',
            result: result
        })
      } catch (error) {
        console.log('error: ', error.message);
        return res.status(500).json({
            status:'Err!',
            message: 'Không thể gửi Email'
        })
    }
    }
    //API đổi mật khẩu
    @Put('change-password')
    @UseGuards(StoriesGuard)
    async changePass(@Body() changePassDto:ChangePassDto,@Req() req:Request,@Res() res: Response):Promise<object> {
        try {
            const result = await this.accountService.changePass(changePassDto,req)
            return res.status(200).json({
                status:'Ok!',
                message:'Đổi mật khẩu thành công',
                result: result
            })
        } catch (error) {
            console.log('error: ', error);
            return res.status(500).json({
                status:'Err!',
                message:'Đổi mật không khẩu thành công'
            })
        }
    }

 
}




    

