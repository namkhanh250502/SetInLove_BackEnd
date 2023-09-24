import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StoriesDto } from './dto/stories.dto';
import { Request } from 'express';

@Injectable()
export class StoriesService {
    constructor(private prisma: PrismaService) {}

    async createStories(files:Express.Multer.File[],storiesDto: StoriesDto):Promise<any> {
        const createData = {
            avatar: null,
            crush_avatar: null,
            file_music:null,
            side_story: storiesDto.side_story,
            your_name: storiesDto.your_name,
            crush_name: storiesDto.crush_name,
            story: storiesDto.story,
            day_love_begins:null,
            id_account: Number(storiesDto.id_account)
        }
        if(files[0]) {
            createData.avatar = files[0].path.replace('uploads\\','')
        }
        if(files[1]) {
            createData.crush_avatar =files[1].path.replace('uploads\\','')
        }
        if(files[2]) {
            createData.file_music =files[2].path.replace('uploads\\','')
        }       
        if(storiesDto.day_love_begins) {
            createData.day_love_begins = storiesDto.day_love_begins
        }
       
        return await this.prisma.stories.create({data: createData})
    }
    async updateStories(files: Express.Multer.File[],storiesDto:StoriesDto,req:Request):Promise<any> {
        const originFile = await this.prisma.stories.findFirst()
        const updateData = {
            avatar:  originFile.avatar,
            crush_avatar:  originFile.crush_avatar,
            file_music: originFile.file_music,
            side_story: storiesDto.side_story,
            your_name: storiesDto.your_name,
            crush_name: storiesDto.crush_name,
            story: storiesDto.story,
            day_love_begins: originFile.day_love_begins    
        }
        if(files[0]) {
            updateData.avatar = files[0].path.replace('uploads\\','')
        }
        if(files[1]) {
            updateData.crush_avatar =files[1].path.replace('uploads\\','')
        }
        if(files[2]) {
            updateData.file_music =files[2].path.replace('uploads\\','')
        }
        if(storiesDto.day_love_begins) {
            updateData.day_love_begins = storiesDto.day_love_begins
        }      
        return await this.prisma.stories.update({
            where:{
                id_account:Number(req.user)},
                data: updateData
        })        
    }
    async get(req: Request):Promise<any> {
        console.log('req: ', req.user);
        return await this.prisma.stories.findFirst({
            where:{
                id_account:Number(req.user)}})
            }
        
}
