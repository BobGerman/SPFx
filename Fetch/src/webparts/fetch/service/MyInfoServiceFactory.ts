import { IMyInfoService } from './IMyInfoService';
import MockMyInfoService from './MockMyInfoService';
import MyInfoService from './MyInfoService';

import { EnvironmentType } from '@microsoft/sp-core-library';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';

export class MyInfoServiceFactory {
    public static getService(context: IWebPartContext, 
                             serviceScope: ServiceScope,
                             environmentType: EnvironmentType) : IMyInfoService {

        if (environmentType === EnvironmentType.Local) {
          return new MockMyInfoService(context);
        } else {
          return new MyInfoService(context, serviceScope);
        }
    }
}