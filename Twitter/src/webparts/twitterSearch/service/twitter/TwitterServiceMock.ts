import ITweet from '../../model/ITweet';
import { ITwitterService } from './ITwitterService';

export default class TwitterServiceMock implements ITwitterService {
    
    public searchTweets (query: string):
        Promise<ITweet[] | string> {

        return new Promise<ITweet[]> ((resolve => {
            resolve (this.mockItems);
        }));

    }

    public postTweet(text: string, query: string, ):
        Promise<null | string> {

            return new Promise<null | string> ((resolve => {
                resolve(null);
            }));

        }

    private mockItems =
    [
        {
            "text": "Mock tweet 1",
            "from": "@Sender1",
            "dateTimeSent": new Date(2018, 5, 1, 12, 5, 0, 0),
            "imageUrl": "#"
        },
        {
            "text": "Mock tweet 2",
            "from": "@Sender2",
            "dateTimeSent": new Date(2018, 5, 1, 12, 6, 0, 0),
            "imageUrl": "#"
        },
        {
            "text": "Mock tweet 3",
            "from": "@Sender3",
            "dateTimeSent": new Date(2018, 5, 1, 12, 7, 0, 0),
            "imageUrl": "#"
        }];
}