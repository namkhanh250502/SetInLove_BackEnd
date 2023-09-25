import { IsEmail, IsOptional, IsString, Length, isEmail } from "class-validator";

export class FogotPass {
    @IsEmail()
    email: string
    @IsString()
    @IsOptional()
    @Length(6, 20, { message: 'Mật khẩu tối thiểu 6 ký tự và tối đa 12 ký tự' })
    password: string
}