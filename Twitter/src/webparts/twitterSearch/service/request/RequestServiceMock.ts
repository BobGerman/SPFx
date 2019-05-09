import IRequest from '../../model/IRequest';
import { IRequestService } from './IRequestService';

export default class RequestService implements IRequestService {
    
    public getRequestsForUser (query: string):
        Promise<IRequest[] | string> {

        return new Promise<IRequest[]> ((resolve => {
            resolve (this.mockItems);
        }));

    }

    private mockItems =
    [
        {
            iconUrl: <string>require('../../assets/icons8-wait-96.png'),
            title: "Send requested",
            detail: "The quick brown fox jumps over the lazy dog"
        },
        {
            iconUrl: <string>require('../../assets/icons8-wait-96.png'),
            title: "Send requested",
            detail: "The quick brown fox jumps over the lazy dog"
        },
        {
            iconUrl: <string>require('../../assets/icons8-wait-96.png'),
            title: "Send requested",
            detail: "The quick brown fox jumps over the lazy dog"
        }];
}