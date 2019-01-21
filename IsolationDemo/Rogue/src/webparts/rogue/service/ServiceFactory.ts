import { IGraphItemService } from './IGraphItemService';
import MockGraphItemService from './MockGraphItemService';
import GraphMailService from './GraphMailService';
import GraphOneNoteService from './GraphOneNoteService';

import { EnvironmentType } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';

export class ServiceFactory {

  public static getMailService(context: WebPartContext,
    serviceScope: ServiceScope,
    environmentType: EnvironmentType): IGraphItemService {

    if (environmentType === EnvironmentType.Local) {
      return new MockGraphItemService();
    } else {
      return new GraphMailService(context, serviceScope);
    }
  }

  public static getOneNoteService(context: WebPartContext,
    serviceScope: ServiceScope,
    environmentType: EnvironmentType): IGraphItemService {

    if (environmentType === EnvironmentType.Local) {
      return new MockGraphItemService();
    } else {
      return new GraphOneNoteService(context, serviceScope);
    }
  }

}