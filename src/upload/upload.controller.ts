import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express'; //FilesInterceptor表示支持多文件上传
import { join } from 'path';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('stream/:id')
  async down(@Param('id') id: string, @Res() res: Response) {
    const url = join(__dirname, '../images/' + id + '.png');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment;filename=${id}.zip`);
    tarStream.pipe(res);
  }

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    return { filename: file.filename };
  }
  @Get('export/:id')
  export(@Param('id') id: string, @Res() res: Response) {
    const url = join(__dirname, '../images/' + id + '.png');
    res.download(url);
  }
}
