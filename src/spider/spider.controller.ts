import { Controller, Get } from '@nestjs/common';
import { SpiderService } from './spider.service';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
@Controller('spider')
export class SpiderController {
  constructor(private readonly spiderService: SpiderService) {}

  @Get()
  async findAll() {
    const urls = ['https://pic.jpmn5.com/Uploadfile/pic/5597.jpg'];
    await this.writeFile(urls);
    return this.spiderService.findAll();
  }
  async writeFile(urls: string[]) {
    urls.forEach(async (url) => {
      const buffer = await axios
        .get(url, { responseType: 'arraybuffer' })
        .then((res) => res.data);
      const ws = fs.createWriteStream(
        path.join(__dirname, '../images/' + new Date().getTime() + '.jpg'),
      );
      ws.write(buffer);
    });
  }
}
