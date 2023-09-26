import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEmpty, IsOptional, IsString, IsUrl, Length } from "class-validator"

export class StoriesDto {
    @ApiProperty({
        description:'the avatar of the stories',
        example:'avatar.png'
    })
    @IsOptional()
    @IsUrl()
    avatar?: string
    @ApiProperty({
        description:'the crush_avatar of the stories',
        example:'crush_avatar.png'
    })
    @IsOptional()
    @IsUrl()
    crush_avatar?: string
    @ApiProperty({
        description:'the file_music of the stories',
        example:'filemusic.png'
    })
    @IsOptional()
    @IsUrl()
    file_music?: string
    @ApiProperty({
        description:'the story of the stories',
        example:'Welcome to Set In Love'
    })
    @IsString()
    @IsOptional()
    @Length(3,50,{message:'Story có độ dài tối thiểu 3 và tối đa 50'})
    story?: string
    @ApiProperty({
        description:'the side_story of the stories',
        example:'See you again'
    })
    @IsString()
    @IsOptional()
    @Length(3,50,{message:'side-story có độ dài tối thiểu 3 và tối đa 50'})
    side_story?: string
    @ApiProperty({
        description:'the day_love_begins of the stories',
        example:'2011-10-10T14:48:00Z'
    })
    @IsOptional()
    day_love_begins?: Date
    @ApiProperty({
        description:'the your_name of the stories',
        example:'Nguyễn Văn A'
    })
    @IsString()
    @IsOptional()
    @Length(3,20,{message:'your_name có độ dài tối thiểu 3 và tối đa 20'})
    your_name?: string
    @ApiProperty({
        description:'the crush_name of the stories',
        example:'Nguyễn Thị B'
    })
    @IsString()
    @IsOptional()
    @Length(3,20,{message:'crush_name có độ dài tối thiểu 3 và tối đa 20'})
    crush_name?: string
}