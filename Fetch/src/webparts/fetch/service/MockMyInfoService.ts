import { IMyInfoService } from './IMyInfoService';
import { IMyInfo } from '../model/IMyInfo';

import { IWebPartContext } from '@microsoft/sp-webpart-base';

export default class MockMyInfoService implements IMyInfoService {

    private mockItems: IMyInfo =
    {
        myName: "Bob Mock",
        spListNames: ["List A", "List B", "List C"],
        postings: ["lorem ipsum", "haec ineptias","non est contoso"]
    };

    constructor(context: IWebPartContext) { }

    public get(): Promise<IMyInfo | string> {
        return new Promise<IMyInfo>((resolve) => {
            resolve (this.mockItems);
        });
    }
}