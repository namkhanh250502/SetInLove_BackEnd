import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StoriesDto } from './dto/stories.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class StoriesService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createStories(
    files: {
      avatar?: Express.Multer.File[];
      crush_avatar?: Express.Multer.File[];
      file_music?: Express.Multer.File[];
    },
    storiesDto: StoriesDto,
    req: Request,
  ): Promise<object> {
    console.log('files: ', files);

    const accountID = await await this.jwtService.verify(
      req.headers.authorization.replace('Bearer ', ''),
      { secret: process.env.JWT_SECRET },
    );
    const createData = {
      avatar: null,
      crush_avatar: null,
      file_music: null,
      side_story: storiesDto.side_story,
      your_name: storiesDto.your_name,
      crush_name: storiesDto.crush_name,
      story: storiesDto.story,
      day_love_begins: null,
      id_account: Number(accountID.id),
    };
    if (files.avatar && files.avatar[0]) {    
        createData.avatar = files.avatar[0].path.replace('uploads\\', '');  
    }
    if (files.crush_avatar && files.crush_avatar[0]) {
        createData.crush_avatar = files.crush_avatar[0].path.replace('uploads\\','',);
    }
    if (files.file_music && files.file_music[0]) {
        createData.file_music = files.file_music[0].path.replace( 'uploads\\','',);
    }
    if (storiesDto.day_love_begins) {
      createData.day_love_begins = storiesDto.day_love_begins;
    }

    return await this.prisma.stories.create({ data: createData });
  }
  async updateStories(
    files: {
      avatar?: Express.Multer.File[];
      crush_avatar?: Express.Multer.File[];
      file_music?: Express.Multer.File[];
    },
    storiesDto: StoriesDto,
    req: Request,
  ): Promise<object> {
    console.log('req: ', req.user);
    const originalFile = await this.prisma.stories.findFirst();
    const updateData = {
      avatar: originalFile.avatar,
      crush_avatar: originalFile.crush_avatar,
      file_music: originalFile.file_music,
      side_story: storiesDto.side_story,
      your_name: storiesDto.your_name,
      crush_name: storiesDto.crush_name,
      story: storiesDto.story,
      day_love_begins: originalFile.day_love_begins,
    };
    if (files.avatar && files.avatar[0]) { 
        updateData.avatar = files.avatar[0].path.replace('uploads\\', ''); 
    }
    if (files.crush_avatar && files.crush_avatar[0]) {
        updateData.crush_avatar = files.crush_avatar[0].path.replace('uploads\\','',);
    }
    if (files.file_music && files.file_music[0]) {
        updateData.file_music = files.file_music[0].path.replace('uploads\\','',);  
    }
    if (storiesDto.day_love_begins) {
      updateData.day_love_begins = storiesDto.day_love_begins;
    }
    return await this.prisma.stories.update({
      where: {
        id_account: Number(req.user),
      },
      data: updateData,
    });
  }
  async get(req: Request): Promise<object> {
    console.log('req: ', req.user);
    return await this.prisma.stories.findFirst({
      where: {
        id_account: Number(req.user),
      },
    });
  }
}
