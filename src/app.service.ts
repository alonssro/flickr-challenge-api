/* eslint-disable @typescript-eslint/camelcase */
import * as parser from 'xml2json';

import {
  Injectable,
  HttpService,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { FlickrSearchDto } from './dto/flickr-search.dto';

/**
 * Flickr Service
 */
@Injectable()
export class AppService {
  /**
   *
   * @param httpService
   * @param configService
   */
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  /**
   * Get photos by tag from Flickr
   * @param  {FlickrSearchDto} flickrPhoto  Text to search
   * @returns Array of Objects containing info per photo
   */
  async getFlickrPhotos(flickrSearchDto: FlickrSearchDto): Promise<object[]> {
    const flickrApikey = this.configService.get<string>('FLICKR_API_KEY');

    if (!flickrSearchDto.text)
      throw new HttpException('Search Query Empty', HttpStatus.BAD_REQUEST);

    const {
      data: {
        photos: { photo },
      },
    }: any = await this.httpService
      .get('https://www.flickr.com/services/rest', {
        params: {
          api_key: flickrApikey,
          text: flickrSearchDto.text,
          method: 'flickr.photos.search',
          format: 'json',
          nojsoncallback: 1,
        },
      })
      .toPromise();
    return photo;
  }

  /**
   * Get public feed
   * @returns Array of public photos
   */
  async getPublicFeed(): Promise<any> {
    const { data }: any = await this.httpService
      .get('https://www.flickr.com/services/feeds/photos_public.gne', {})
      .toPromise();
    const {
      feed: { entry },
    }: any = JSON.parse(parser.toJson(data));
    return entry;
  }
}
