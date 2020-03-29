import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
export class FlickrSearchDto {
  text: string;
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    const flickrSearch = new FlickrSearchDto();
    flickrSearch.text = 'People';
    it('should return an "object"', () => {
      expect(appController.getFlickrPhotos(flickrSearch)).toBe(Object);
    });
  });
});
