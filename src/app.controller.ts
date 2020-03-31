import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FlickrSearchDto } from './dto/flickr-search.dto';

/**
 * Flickr Controller
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Get photos by tag from Flickr
   * @param  {FlickrSearchDto} flickrPhoto  Text to search
   */
  @Post('/photos')
  getFlickrPhotos(@Body() flickrPhoto: FlickrSearchDto): Promise<object> {
    return this.appService.getFlickrPhotos(flickrPhoto);
  }

  /**
   * Get Flickr public feed
   */
  @Get('/feed')
  getPublicFeed(): Promise<object> {
    return this.appService.getPublicFeed();
  }
}
