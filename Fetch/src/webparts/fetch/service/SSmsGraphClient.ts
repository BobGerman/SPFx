import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IMyInfo } from '../model/IMyInfo';
import { ISubService } from './ISubService';

import { MSGraphClient } from '@microsoft/sp-client-preview';
import { IGraphPeopleResponse } from './HttpResponses/IGraphPeopleResponse';

export class SSmsGraphClient implements ISubService {

    public getInfo(context: IWebPartContext, serviceScope: ServiceScope) {
        return new Promise<IMyInfo | string> ((resolve, reject) => {

            const client: MSGraphClient =
                serviceScope.consume(MSGraphClient.serviceKey);

            client
                .api("me/people")
                .version("v1.0")
                .get((err, res) => {
                    
                    if (err) {

                        reject(err.message);

                    } else {

                        let result: string[] = res.value.slice(0,9).map((v) => {
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
                            "title": "Graph /me/people from MSGraphClient (preview)",
                            "items": result
                        });

                    }
                });                
        });
    }

}