import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IMyInfo } from '../model/IMyInfo';
import { ISubService } from './ISubService';

import { GraphHttpClient, GraphHttpClientResponse } from '@microsoft/sp-http';
import { IGraphMeResponse } from './HttpResponses/IGraphMeResponse';

export class SSgraphHttpClient implements ISubService {

    getInfo(context: IWebPartContext, serviceScope: ServiceScope) {
        return new Promise<IMyInfo | string> ((resolve, reject) => {
            context.graphHttpClient.get("v1.0/me",
            GraphHttpClient.configurations.v1)
        .then ((response: GraphHttpClientResponse) => {
            if (response.ok) {
                return response.json();
            } else {
                throw (`Error ${response.status}: ${response.statusText}`);  
            }
        })
        .then ((o: IGraphMeResponse) => {
            resolve({
                "title": "Graph call",
                "items": [o.displayName]
            });
        })
        .catch ((e) => {
            reject(e);
        });
        });
    }

}