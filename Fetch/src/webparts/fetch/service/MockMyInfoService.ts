import { IMyInfoService } from './IMyInfoService';
import { IMyInfo } from '../model/IMyInfo';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ClientMode } from '../model/ClientModes';

export default class MockMyInfoService implements IMyInfoService {

    private mockItems: IMyInfo =
    {
        title: "Mock data",
        items: ["lorem ipsum", "haec ineptias","non est contoso"]
    };

    constructor(context: IWebPartContext) { }

    public get(clientMode: ClientMode): Promise<IMyInfo | string> {
        return new Promise<IMyInfo>((resolve) => {
            resolve (this.mockItems);
        });
    }
}