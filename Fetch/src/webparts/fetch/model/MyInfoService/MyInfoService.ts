import { IMyInfoService } from './IMyInfoService';
import { IMyInfo } from './IMyInfo';

import { IWebPartContext } from '@microsoft/sp-webpart-base';

export default class MyInfoService implements IMyInfoService {

    private context: IWebPartContext;
    constructor(context: IWebPartContext) {
        this.context = context;
    }

    public get(): Promise<IMyInfo | string> {
        return new Promise<IMyInfo>((resolve) => {
        
            Promise.all([
                this.getName(),
                this.getLists(),
                this.getCustomers()
            ]).then((values) => {
                resolve ({
                    myName: values[0],
                    spListNames: values[1],
                    customers: values[2]
                });
            });
        });
    }

    private getName(): Promise<string> {
        return new Promise<string>((resolve) => {
            resolve("Bob Promise");
        });
    }

    private getLists(): Promise<string[]> {
        return new Promise<string[]>((resolve) => {
            resolve(["List Alpha", "List B", "List C"]);
        });
    }

    private getCustomers(): Promise<string[]> {
        return new Promise<string[]>((resolve) => {
            resolve(["A Datum", "Blue Yonder Airlines","Contoso"]);
        });
    }
}