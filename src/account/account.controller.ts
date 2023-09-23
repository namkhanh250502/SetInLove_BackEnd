import { Body, Controller, Delete, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { RegisterDto } from './dto/register.dto';
import { Response,Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { StoriesGuard } from 'src/stories/stories.guard';




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
    @Get('detailaccount')
    @UseGuards(StoriesGuard)
    async detailaccount(@Req() req: Request,@Res() res: Response):Promise<object> {
        try {
            const result = await this.accountService.detailaccount(req)
            return res.status(200).json({
                status:'Ok!',
                message:'Đọc dữ liệu thành công',
                result: result
            })
            
        } catch (error) {
            console.log('error: ', error);
            return res.status(500).json({
                status:'Ok!',
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
}
