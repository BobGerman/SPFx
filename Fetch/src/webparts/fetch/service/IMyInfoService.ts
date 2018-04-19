import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IMyInfo } from '../model/IMyInfo';

export interface IMyInfoService {
    get(): Promise<IMyInfo | string>;
}