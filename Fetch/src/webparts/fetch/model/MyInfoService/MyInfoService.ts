import { IMyInfoService } from './IMyInfoService';
import { IMyInfo } from './IMyInfo';

import { IWebPartContext } from '@microsoft/sp-webpart-base';

export default class MyInfoService implements IMyInfoService {

    private mockItems: IMyInfo =
    {
        myName: "Bob Mock",
        spListNames: ["List A", "List B", "List C"],
        customers: ["A Datum", "Blue Yonder Airlines","Contoso"]
    };

    public get(context: IWebPartContext): Promise<IMyInfo | string> {
        return new Promise<IMyInfo>((resolve) => {
            resolve (this.mockItems);
        });
    }
}