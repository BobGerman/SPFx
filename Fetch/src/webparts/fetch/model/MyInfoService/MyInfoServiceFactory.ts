import { IMyInfoService } from './IMyInfoService';
import MockMyInfoService from './MockMyInfoService';
import MyInfoService from './MyInfoService';

import { EnvironmentType } from '@microsoft/sp-core-library';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export class MyInfoServiceFactory {
    public static getService(context: IWebPartContext, 
                             environmentType: EnvironmentType) : IMyInfoService {

        if (environmentType === EnvironmentType.Local) {
          return new MockMyInfoService(context);
        } else {
          return new MyInfoService(context);
        }
    }
}