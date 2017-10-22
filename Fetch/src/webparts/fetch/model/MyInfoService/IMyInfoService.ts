import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IMyInfo } from './IMyInfo';

export interface IMyInfoService {
    get(context: IWebPartContext): Promise<IMyInfo | string>;
}