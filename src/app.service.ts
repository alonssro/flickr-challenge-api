/* eslint-disable @typescript-eslint/camelcase */
import {
  Injectable,
  HttpService,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FlickrSearchDto } from './dto/flickr-search.dto';

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getFlickrPhotos(flickrSearchDto: FlickrSearchDto): Promise<object> {
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
}
