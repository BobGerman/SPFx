import ITweet from '../../model/ITweet';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';

export interface ITwitterServiceProps {
    context: IWebPartContext;
    serviceScope: ServiceScope;
    clientId: string;
    searchEndPointUrl: string;
    postEndpointUrl: string;
}

export interface ITwitterService {
    searchTweets(query: string): Promise<ITweet[] | string>;
    postTweet(text: string, query: string): Promise<void | string>;
}