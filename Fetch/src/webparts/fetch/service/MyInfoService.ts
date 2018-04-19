import { IMyInfoService } from './IMyInfoService';
import { IMyInfo } from '../model/IMyInfo';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { GraphHttpClient, GraphHttpClientResponse } from '@microsoft/sp-http';

import { IGraphMeResponse } from './HttpResponses/IGraphMeResponse';
import { ISpListResponse } from './HttpResponses/ISpListResponse';
import { IPosting } from './HttpResponses/IPosting';

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
                this.getPostings()
            ])
            .then((values) => {
                resolve ({
                    myName: values[0],
                    spListNames: values[1],
                    postings: values[2]
                });
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    // Example using GraphHttpClient
    // import { GraphHttpClient, GraphHttpClientResponse } from '@microsoft/sp-http';
    // import { IGraphMeResponse } from './HttpResponses/IGraphMeResponse';
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
            .then ((o: IGraphMeResponse) => {
                resolve(o.displayName);
            })
            .catch ((e) => {
                reject(e);
            });
        });
    }

    // Example using SPHttpClient - local SharePoint site
    // import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
    // import { ISpListResponse } from './HttpResponses/ISpListResponse';
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
            .then((o: ISpListResponse) => {
                let result = o.value.map((v) => { return v.Title; });
                resolve(result);
            })
            .catch ((e) => {
                reject(e);
            });
        });
    }

    // Example using simple fetch - Northwind DB
    // import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
    // import { ICustomersResponse } from './HttpResponses/ICustomersResponse';
    private getPostings(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            let query = "https://jsonplaceholder.typicode.com/posts/";

            // NOTE: you could use just fetch() on modern browsers (not IE)
            this.context.httpClient
                .fetch(query, HttpClient.configurations.v1,
            {
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
            .then((o: IPosting[]) => {
                let result = o.slice(0,9).map((v) => { return v.title; });
                resolve(result);
            })
            .catch ((e) => {
                reject([e]);
            });
        });
    }
}