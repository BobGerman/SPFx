import { ITaskService } from './ITaskService';
import MockMyInfoService from './MockTaskService';

import { EnvironmentType } from '@microsoft/sp-core-library';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';

export class ServiceFactory {
    public static getService(context: IWebPartContext, 
                             serviceScope: ServiceScope,
                             environmentType: EnvironmentType) : ITaskService {

        if (environmentType === EnvironmentType.Local) {
          return new MockMyInfoService(context);
        } else {
          return new MockMyInfoService(context);  //, serviceScope);
        }
    }
}