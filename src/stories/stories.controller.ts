import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { StoriesDto } from './dto/stories.dto';
import { StoriesGuard } from './stories.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Stories')
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  //API tạo stories
  @ApiOperation({ summary: 'Tạo stories' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
			type: 'object',
			properties: {
				avatar: {
					type: 'string',
					format:'binary'
				},
				crush_avatar: {
           type: 'string',
           format:'binary'
        },
				file_music: {
					type: 'string',
					format:'binary'
				},
				your_name: {
					type: 'string',
					default:'Nguyễn Văn A',
				},
				crush_name: {
					type: 'string',
					default:'Nguyễn Thị B',
				},
        story:{
          type:'string',
          default:'Welcome to Set In Love'
        },
        side_story:{
          type:'string',
          default:'See you again'
        },
        day_love_begins:{
          type:' date',
          default:'2011-10-10T14:48:00Z'
        }
			},
			required: [],
		}
  })
  @Post('create')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'avatar', maxCount: 1 },
        { name: 'crush_avatar', maxCount: 1 },
        { name: 'file_music', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            return cb(null, file.originalname);
          },
        }),
      },
    ),
  )
  async uploadFile(
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      crush_avatar?: Express.Multer.File[];
      file_music?: Express.Multer.File[];
    },
    @Req() req: Request,
    @Body() storiesDto: StoriesDto,
    @Res() res: Response,
  ): Promise<object> {
    try {
      const result = await this.storiesService.createStories(
        files,
        storiesDto,
        req,
      );
      return res.status(200).json({
        status: 'Ok!',
        message: 'Cập nhật thành công',
        result: result,
      });
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
        status: 'Err!',
        message: 'Cập nhật thất bại',
      });
    }
  }
  //API xem chi tiết stories
  @ApiOperation({ summary: 'Chi tiết stories' })
  @ApiBearerAuth()
  @Get('detail')
  @UseGuards(StoriesGuard)
  async get(@Req() req: Request, @Res() res: Response): Promise<object> {
    console.log('req: ', req);
    try {
      const result = await this.storiesService.get(req);
      return res.status(200).json({
        status: 'Ok!',
        message: 'Lấy dữ liệu thành công',
        result: result,
      });
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
        status: 'Err!',
        message: 'Lấy dữ liệu thất bại',
      });
    }
  }

  //API chỉnh sửa stories
  @ApiOperation({ summary: 'Chỉnh sửa stories' })
  @Put('update')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseGuards(StoriesGuard)
  @ApiBody({
    schema: {
			type: 'object',
			properties: {
				avatar: {
					type: 'string',
					format:'binary'
				},
				crush_avatar: {
           type: 'string',
           format:'binary'
        },
				file_music: {
					type: 'string',
					format:'binary'
				},
				your_name: {
					type: 'string',
					default:'Nguyễn Văn A',
				},
				crush_name: {
					type: 'string',
					default:'Nguyễn Thị B',
				},
        story:{
          type:'string',
          default:'Welcome to Set In Love'
        },
        side_story:{
          type:'string',
          default:'See you again'
        },
        day_love_begins:{
          type:' date',
          default:'2011-10-10T14:48:00Z'
        }
			},
			
		}
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'avatar', maxCount: 1 },
        { name: 'crush_avatar', maxCount: 1 },
        { name: 'file_music', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename(req, file, callback) {
            callback(null, file.originalname);
          },
        }),
      },
    ),
  )
  async updateStories(
    @Body() storiesDto: StoriesDto,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      crush_avatar?: Express.Multer.File[];
      file_music?: Express.Multer.File[];
    },
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    try {
      const result = await this.storiesService.updateStories(
        files,
        storiesDto,
        req,
      );
      console.log('result: ', result);
      return res.status(200).json({
        status: 'Ok!',
        message: 'Cập nhật thành công',
        result: result,
      });
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
        status: 'Err!',
        message: 'Cập nhật thất bại',
      });
    }
  }
}
