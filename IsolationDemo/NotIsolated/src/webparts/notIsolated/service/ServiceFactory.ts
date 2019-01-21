import { IMailService } from './IMessageService';
import MockTaskService from './MockMailService';
import GraphMailService from './GraphMailService';

import { EnvironmentType } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';

export class ServiceFactory {
    public static getService(context: WebPartContext, 
                             serviceScope: ServiceScope,
                             environmentType: EnvironmentType) : IMailService {

        if (environmentType === EnvironmentType.Local) {
          return new MockTaskService();
        } else {
          return new GraphMailService(context, serviceScope);
        }
    }
}