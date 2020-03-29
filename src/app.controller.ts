import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { FlickrSearchDto } from './dto/flickr-search.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/photos')
  getFlickrPhotos(@Body() createCatDto: FlickrSearchDto): Promise<object> {
    return this.appService.getFlickrPhotos(createCatDto);
  }
}
