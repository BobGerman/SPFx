import IRequest from '../../model/IRequest';
import { IRequestService } from './IRequestService';

export default class RequestServiceMock implements IRequestService {
    
    public getRequestsForCurrentUser ():
        Promise<IRequest[] | string> {

        return new Promise<IRequest[]> ((resolve => {
            resolve (this.mockItems);
        }));

    }

    private mockItems = 
    [
        {
            iconUrl: <string>require('../../assets/icons8-wait-96.png'),
            title: "Tweet requested",
            detail: "The quick brown fox jumps over the lazy dog",
            lastUpdate: new Date()
        },
        {
            iconUrl: <string>require('../../assets/icons8-ok-96.png'),
            title: "Tweet sent",
            detail: "The quick brown fox jumps over the lazy dog",
            lastUpdate: new Date()
        },
        {
            iconUrl: <string>require('../../assets/icons8-close-window-96.png'),
            title: "Tweet denied",
            detail: "The quick brown fox jumps over the lazy dog",
            lastUpdate: new Date()
        }];
}