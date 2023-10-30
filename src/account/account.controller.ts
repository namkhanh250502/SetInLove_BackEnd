import { Body, Controller, Delete, Get, Header, Headers, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { RegisterDto } from './dto/register.dto';
import { Response,Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { StoriesGuard } from 'src/stories/stories.guard';
import { FogotPassDto } from './dto/fogotPass.dto';
import { ChangePassDto } from './dto/changePass.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags,ApiOkResponse, ApiBody, ApiBearerAuth, ApiConsumes, ApiResponse } from '@nestjs/swagger';



@Controller('account')
@ApiTags('Account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    //APi đăng ký
    @ApiOperation({ summary: 'Đăng ký'})
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
    @ApiOperation({ summary: 'Đăng nhập' })
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
            const result = await this.accountService.login(loginDto)
            console.log('error: ', error);
            return res.status(500).json({
                status:'Err!',
                message:'Đăng nhập thất bại',
                result
            })
        }
    }

    //API đọc dữ liệu người dùng
    @ApiOperation({ summary: 'Chi tiết người dùng' })
    @ApiBearerAuth()
    @Get('detail')
    @Header('Cache-Control', 'none')
    @UseGuards(StoriesGuard)
    async detailaccount(@Req() req: Request,@Res() res: Response):Promise<object> {  
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
    @ApiOperation({ summary: 'Xóa tài khoản người dùng' })
    @Delete('remove')
    @ApiBearerAuth()
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
    @ApiOperation({ summary: 'Quên mật khẩu'})
    @Put('forgot-password')
    async sendEmail(@Req() req: Request,@Res() res: Response,@Body() fogotPassDto: FogotPassDto):Promise<object> {

      try {
        const result = await this.accountService.sendEmail(fogotPassDto);
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
    @ApiOperation({ summary: 'Đổi mật khẩu' })
    @Put('change-password')
    @ApiBearerAuth()
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




    

