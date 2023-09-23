import { IsString, Length } from "class-validator"

export class RegisterDto {
    @IsString()
    @Length(8, 20, {message: 'Tên tài khoản tối thiểu 8 ký tự và tối đa 20 ký tự'})
    username: string
    @IsString()
    @Length(6, 20, { message: 'Mật khẩu tối thiểu 6 ký tự và tối đa 12 ký tự' })
    password: string
    @IsString()
    email: string
}