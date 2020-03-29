import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FlickrSearchDto } from './dto/flickr-search.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/photos')
  getFlickrPhotos(@Body() flickrPhoto: FlickrSearchDto): Promise<object> {
    return this.appService.getFlickrPhotos(flickrPhoto);
  }

  @Get('/feed')
  getPublicFeed(): Promise<object> {
    return this.appService.getPublicFeed();
  }
}
