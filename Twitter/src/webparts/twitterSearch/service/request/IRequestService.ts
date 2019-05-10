import IRequest from '../../model/IRequest';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';

export interface IRequestServiceProps {
    context: IWebPartContext;
    serviceScope: ServiceScope;
    listName: string;
    currentUserId: number;
}

export interface IRequestService {
    getRequestsForCurrentUser(): Promise<IRequest[] | string>;
}