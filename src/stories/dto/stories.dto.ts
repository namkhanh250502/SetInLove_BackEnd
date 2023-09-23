import { IsString, Length } from "class-validator"

export class StoriesDto {
    @IsString()
    avatar?: string
    @IsString()
    crush_avatar?: string
    @IsString()
    file_music?: string
    @IsString()
    @Length(3,50,{message:'Độ dài tối thiểu 3 và tối đa 50'})
    story?: string
    @IsString()
    @Length(3,50,{message:'Độ dài tối thiểu 3 và tối đa 50'})
    side_story?: string
    id_account?: number
    day_love_begins?: Date
    @IsString()
    @Length(3,20,{message:'Độ dài tối thiểu 3 và tối đa 20'})
    your_name?: string
    @IsString()
    @Length(3,20,{message:'Độ dài tối thiểu 3 và tối đa 20'})
    crush_name?: string
}