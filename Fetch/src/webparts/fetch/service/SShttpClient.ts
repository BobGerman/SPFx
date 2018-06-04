import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IMyInfo } from '../model/IMyInfo';
import { ISubService } from './ISubService';

import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { IPosting } from './HttpResponses/IPosting';

export class SShttpClient implements ISubService {

    public getInfo(context: IWebPartContext, serviceScope: ServiceScope) {
        return new Promise<IMyInfo | string> ((resolve, reject) => {

            let query = "https://jsonplaceholder.typicode.com/posts/";

            // NOTE: you could use just fetch() on modern browsers (not IE)
            context.httpClient
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
                resolve({
                    "title": "Latin gibberish from HttpClient",
                    "items": result
                });
            })
            .catch ((e) => {
                reject([e]);
            });
        });
    }
}