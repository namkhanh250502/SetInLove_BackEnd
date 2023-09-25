import { IsEmail, IsEmpty, IsOptional, IsString, IsUrl, Length } from "class-validator"

export class StoriesDto {
    @IsOptional()
    @IsUrl()
    avatar?: string
    @IsOptional()
    @IsUrl()
    crush_avatar?: string
    @IsOptional()
    @IsUrl()
    file_music?: string
    @IsString()
    @IsOptional()
    @Length(3,50,{message:'Story có độ dài tối thiểu 3 và tối đa 50'})
    story?: string
    @IsString()
    @IsOptional()
    @Length(3,50,{message:'side-story có độ dài tối thiểu 3 và tối đa 50'})
    side_story?: string
    @IsOptional()
    id_account?: number
    @IsOptional()
    day_love_begins?: Date
    @IsString()
    @IsOptional()
    @Length(3,20,{message:'your_name có độ dài tối thiểu 3 và tối đa 20'})
    your_name?: string
    @IsString()
    @IsOptional()
    @Length(3,20,{message:'crush_name có độ dài tối thiểu 3 và tối đa 20'})
    crush_name?: string
}