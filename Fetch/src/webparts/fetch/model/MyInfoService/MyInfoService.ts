import { IMyInfoService } from './IMyInfoService';
import { IMyInfo } from './IMyInfo';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { GraphHttpClient, GraphHttpClientResponse } from '@microsoft/sp-http';

export default class MyInfoService implements IMyInfoService {

    private context: IWebPartContext;
    constructor(context: IWebPartContext) {
        this.context = context;
    }

    // Get all or nothing
    public get(): Promise<IMyInfo | string> {
        return new Promise<IMyInfo>((resolve, reject) => {
        
            Promise.all([
                this.getName(),
                this.getLists(),
                this.getCustomers()
            ])
            .then((values) => {
                resolve ({
                    myName: values[0],
                    spListNames: values[1],
                    customers: values[2]
                });
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    // Example using GraphHttpClient
    // import { GraphHttpClient, GraphHttpClientResponse } from '@microsoft/sp-http';
    private getName(): Promise<string> {
        return new Promise<string>((resolve, reject) => {

            this.context.graphHttpClient.get("v1.0/me",
                GraphHttpClient.configurations.v1)
            .then ((response: GraphHttpClientResponse) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw (`Error ${response.status}: ${response.statusText}`);  
                }
            })
            .then ((o) => {
                resolve(o.displayName);
            })
            .catch ((e) => {
                reject(e);
            });
        });
    }

    // Example using SPHttpClient - local SharePoint site
    // import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
    private getLists(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            this.context.spHttpClient.fetch(
                this.context.pageContext.web.absoluteUrl +
                    "/_api/lists?$filter=Hidden%20eq%20false",
                SPHttpClient.configurations.v1,
                {
                    method: "GET"
                }
            )
            .then((response: SPHttpClientResponse) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw (`Error ${response.status}: ${response.statusText}`);  
                }
            })
            .then((o) => {
                let result = o.value.map((v) => { return v.Title; });
                resolve(result);
            })
            .catch ((e) => {
                reject(e);
            });
        });
    }

    // Example using simple fetch - Northwind DB
    private getCustomers(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            let query = "http://services.odata.org/Northwind/Northwind.svc/Customers/?$top=10";

            // NOTE: you could use this.context.HttpClient.fetch() - same thing
            fetch(query, {
                method: 'GET',
                headers: {"accept": "application/json"},
                mode: 'cors',
                cache: 'default' 
            })
            .then ((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw (`Error ${response.status}: ${response.statusText}`);
                }
            })
            .then((o) => {
                let result = o.value.map((v) => { return v.CompanyName; });
                resolve(result);
            })
            .catch ((e) => {
                reject([e]);
            });
        });
    }
}