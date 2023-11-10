import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Length } from "class-validator"

export class RegisterDto {
    @ApiProperty({
        description:'the username of the account',
        example:'setinlove'
    })
    @IsString()
    @Length(8, 20, {message: 'Tên tài khoản tối thiểu 8 ký tự và tối đa 20 ký tự'})
    username: string
    @ApiProperty({
        description:'the password of the account',
        example:'Setinlove@'
    })
    @IsString()
    @Length(6, 20, { message: 'Mật khẩu tối thiểu 6 ký tự và tối đa 20 ký tự' })
    password: string
    @ApiProperty({
        description:'the email of the account',
        example:'setinlove@gmail.com'
    })
    @IsEmail({},{message:'Vui lòng nhập đúng định dạng email'})
    email: string
}