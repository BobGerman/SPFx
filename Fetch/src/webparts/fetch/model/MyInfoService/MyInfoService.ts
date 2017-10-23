import { IMyInfoService } from './IMyInfoService';
import { IMyInfo } from './IMyInfo';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

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

    // Example using SPHttpClient - local SharePoint site
    // import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
    private getLists(): Promise<string[]> {
        return new Promise<string[]>((resolve) => {
            this.context.spHttpClient.fetch(
                this.context.pageContext.web.absoluteUrl +
                    "/_api/lists?$filter=Hidden%20eq%20false",
                SPHttpClient.configurations.v1,
                {
                    method: "GET"
                }
            )
            .then((response: SPHttpClientResponse) => {
                response.json().then((o) => {
                    let result = o.value.map((v) => { return v.Title; });
                    resolve(result);
                });                
            });
        });
    }

    // Example using simple fetch - Northwind DB
    private getCustomers(): Promise<string[]> {
        return new Promise<string[]>((resolve) => {
            let query = "http://services.odata.org/Northwind/Northwind.svc/Customers/?$top=10";

            var myInit: RequestInit = {
                method: 'GET',
                headers: {"accept": "application/json"},
                mode: 'cors',
                cache: 'default' 
            };

            // NOTE: you could use this.context.HttpClient.fetch() - same thing
            fetch(query, myInit).then ((response) => {
                response.json().then((o) => {
                    let result = o.value.map((v) => { return v.CompanyName; });
                    resolve(result);
                });
            });
        });
    }
}