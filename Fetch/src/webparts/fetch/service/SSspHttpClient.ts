import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IMyInfo } from '../model/IMyInfo';
import { ISubService } from './ISubService';

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ISpListResponse } from './HttpResponses/ISpListResponse';

export class SSspHttpClient implements ISubService {

    public getInfo(context: IWebPartContext, serviceScope: ServiceScope) {
        return new Promise<IMyInfo | string> ((resolve, reject) => {

            context.spHttpClient.fetch(
                context.pageContext.web.absoluteUrl +
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
                resolve({
                    "title": "SharePoint lists in this site from SpHttpClient",
                    "items": result
                });
            })
            .catch ((e) => {
                reject(e);
            });
        });
    }

}