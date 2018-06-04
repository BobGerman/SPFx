import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IMyInfo } from '../model/IMyInfo';
import { ISubService } from './ISubService';

import { GraphHttpClient, GraphHttpClientResponse } from '@microsoft/sp-http';
import { IGraphPeopleResponse } from './HttpResponses/IGraphPeopleResponse';

export class SSgraphHttpClient implements ISubService {

    public getInfo(context: IWebPartContext, serviceScope: ServiceScope) {
        return new Promise<IMyInfo | string> ((resolve, reject) => {
            context.graphHttpClient.get("v1.0/me/people",
            GraphHttpClient.configurations.v1)
            .then ((response: GraphHttpClientResponse) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw (`Error ${response.status}: ${response.statusText}`);  
                }
            })
            .then ((o: IGraphPeopleResponse) => {
                let x=1;
                let result: string[] = o.value.slice(0,9).map((v) => {
                    if (v.givenName || v.surname) {
                        return v.givenName + " " + v.surname;
                    } else if (v.scoredEmailAddresses && v.scoredEmailAddresses[0]
                               && v.scoredEmailAddresses[0].address) {
                        return v.scoredEmailAddresses[0].address;
                    } else {
                        return `User ID ${v.id}`;
                    }
                });
                resolve({
                    "title": "Graph call",
                    "items": result
                });
            })
            .catch ((e) => {
                reject(e);
            });
        });
    }

}
