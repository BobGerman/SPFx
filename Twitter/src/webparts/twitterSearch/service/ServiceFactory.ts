import { ITwitterService, ITwitterServiceProps } from './twitter/ITwitterService';
import TwitterService from './twitter/TwitterService';
import TwitterServiceMock from './twitter/TwitterServiceMock';

import { IRequestService, IRequestServiceProps } from './request/IRequestService';
import RequestServiceMock from './request/RequestServiceMock';

import { EnvironmentType } from '@microsoft/sp-core-library';

export default class ServiceFactory {

    public static getTwitterService(environmentType: EnvironmentType,
        serviceProps: ITwitterServiceProps): ITwitterService {

        if (environmentType === EnvironmentType.Local) {
            return new TwitterServiceMock();
        } else {
            return new TwitterService(serviceProps);
        }
    }

    public static getRequestService(environmentType: EnvironmentType,
        serviceProps: IRequestServiceProps) : IRequestService {

        return new RequestServiceMock();
    }
}