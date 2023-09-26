import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"

export class ChangePassDto {
    @ApiProperty({
        description:'the password of the account',
        example:'Setinlove@'
    })
    @IsString()
    @IsNotEmpty({message:'Mật khẩu cũ không được bỏ trống'})
    @Length(6, 20, { message: 'Mật khẩu cũ tối thiểu 6 ký tự và tối đa 12 ký tự' })
    password:string
    @ApiProperty({
        description:'the password of the account',
        example:'Setinlove01@'
    })
    @IsString()
    @IsNotEmpty({message:'Mật khẩu mới không được bỏ trống'})
    @Length(6, 20, { message: 'Mật khẩu mới tối thiểu 6 ký tự và tối đa 12 ký tự' })
    newpass: string
}