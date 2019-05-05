import { ITwitterService, ITwitterServiceProps } from './twitter/ITwitterService';
import TwitterService from './twitter/TwitterService';
import TwitterServiceMock from './twitter/TwitterServiceMock';

import { EnvironmentType, ServiceScope } from '@microsoft/sp-core-library';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export default class ServiceFactory {

    public static getTwitterService(environmentType: EnvironmentType,
        serviceProps: ITwitterServiceProps): ITwitterService {

        if (environmentType === EnvironmentType.Local) {
            return new TwitterServiceMock();
        } else {
            return new TwitterService(serviceProps);
        }
    }
}