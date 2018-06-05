import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IMyInfo } from '../model/IMyInfo';
import { ISubService } from './ISubService';

import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { IGraphPeopleResponse } from './HttpResponses/IGraphPeopleResponse';

export class SSaadHttpClient implements ISubService {

    public getInfo(context: IWebPartContext, serviceScope: ServiceScope) {
        return new Promise<IMyInfo | string> ((resolve, reject) => {

            const client: AadHttpClient =
                new AadHttpClient(serviceScope, 'https://graph.microsoft.com');
            
            client.get('https://graph.microsoft.com/v1.0/me/people', 
                AadHttpClient.configurations.v1)
                .then ((response: HttpClientResponse) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw (`Error ${response.status}: ${response.statusText}`);  
                    }
                })
                .then ((o: IGraphPeopleResponse) => {
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
                        "title": "Graph /me/people using AadHttpClient (preview)",
                        "items": result
                    });
                })
                .catch ((e) => {
                    reject(e);
                });
    
            
        });
    }

}