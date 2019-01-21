import { ITaskService } from './ITaskService';
import MockTaskService from './MockTaskService';
import GraphTaskService from './GraphTaskService';

import { EnvironmentType } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';

export class ServiceFactory {
    public static getService(context: WebPartContext, 
                             serviceScope: ServiceScope,
                             environmentType: EnvironmentType) : ITaskService {

        if (environmentType === EnvironmentType.Local) {
          return new MockTaskService();
        } else {
          return new GraphTaskService(context, serviceScope);
        }
    }
}