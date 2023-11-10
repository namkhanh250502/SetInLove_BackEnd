import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Length, isEmail } from "class-validator";

export class FogotPassDto {
    
    @ApiProperty({
        description:'the email of the account',
        example:'setinlove@gmail.com'
    })
    @IsEmail({},{message:'Vui lòng nhập đúng định dạng email!'})
    email: string
    @IsString()
    @IsOptional()
    @Length(6, 20, { message: 'Mật khẩu tối thiểu 6 ký tự và tối đa 12 ký tự' })
    password: string
}