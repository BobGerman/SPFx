import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IMyInfo } from '../model/IMyInfo';
import { ClientMode } from '../model/ClientModes';

export interface IMyInfoService {
    get(clientMode: ClientMode): Promise<IMyInfo | string>;
}