import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IMyInfo } from '../model/IMyInfo';

export interface ISubService{
    getInfo(context: IWebPartContext, serviceScope: ServiceScope) : 
        Promise<IMyInfo | string>;
}