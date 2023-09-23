import { Body, Controller,  Get, Post, Put, Req, Res, UploadedFiles, UseGuards, UseInterceptors  } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {Request, Response} from 'express'
import { StoriesDto } from './dto/stories.dto';
import { StoriesGuard } from './stories.guard';


@Controller('stories')
export class StoriesController {
    constructor(private readonly storiesService: StoriesService) {}


  //API tạo stories
  @Post('create-stories')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          return cb(null,file.originalname)
        }
      }),
    }),
  )
  async uploadFile(@UploadedFiles() files: Express.Multer.File[],@Body() storiesDto: StoriesDto, @Res() res: Response):Promise<Response<any, Record<string, any>>> {      
    try {
        const result = await this.storiesService.createStories(files,storiesDto)
        return res.status(200).json({
            status: 'Ok!',
            message: 'Cập nhật thành công',
            result: result
        })
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({
            status: 'Err!',
            message: 'Cập nhật thất bại',

        })
    }}
    //API xem chi tiết stories
    @Get('get')
    @UseGuards(StoriesGuard)
    async get(@Req() req:Request,@Res() res: Response):Promise<any> {
      console.log('req: ', req);      
      try {
        const result =  await this.storiesService.get(req)
        return res.status(200).json({
          status:'Ok!',
          message: 'Lấy dữ liệu thành công',
          result: result
        })
      } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({
          status:'Err!',
          message: 'Lấy dữ liệu thất bại'
        }) 
      }
    }


    //API chỉnh sửa stories
    @Put('update-stories')
    @UseGuards(StoriesGuard)
    @UseInterceptors(FilesInterceptor('files',10,{
      storage:diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          callback(null,file.originalname)
        },
      })
    }))
    async updateStories( @Body() storiesDto: StoriesDto,@UploadedFiles() files: Express.Multer.File[],@Res() res:Response,@Req() req:Request):Promise<any> {
     
      try {
        const result = await this.storiesService.updateStories(files,storiesDto,req)
        console.log('result: ', result);
        return res.status(200).json({
          status:'Ok!',
          message: 'Cập nhật thành công',
          result: result
        })
      } catch (error) {      
        console.log('error: ', error);
        return res.status(500).json({
          status:'Err!',
          message: 'Cập nhật thất bại'
        })
      }
    }


 
}
