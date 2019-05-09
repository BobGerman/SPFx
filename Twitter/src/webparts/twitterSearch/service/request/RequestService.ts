import IRequest from '../../model/IRequest';
import { IRequestService } from './IRequestService';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export default class RequestService implements IRequestService {
    
    constructor (private requestService) { }

    public getRequestsForUser (user: string):
        Promise<IRequest[] | string> {

        return new Promise<IRequest[]> ((resolve => {
            resolve ([]);
        }));

    }


    

}