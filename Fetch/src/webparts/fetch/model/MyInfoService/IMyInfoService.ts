import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IMyInfo } from './IMyInfo';

export interface IMyInfoService {
    get(): Promise<IMyInfo | string>;
}