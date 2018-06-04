import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IMyInfo } from '../model/IMyInfo';
import { ISubService } from './ISubService';

import { IPosting } from './HttpResponses/IPosting';

export class SSsimpleFetch implements ISubService {

    public getInfo(context: IWebPartContext, serviceScope: ServiceScope) {
        return new Promise<IMyInfo | string> ((resolve, reject) => {

            fetch("https://jsonplaceholder.typicode.com/posts/",
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
                    "title": "Latin gibberish from Fetch",
                    "items": result
                });
            })
            .catch ((e) => {
                reject([e]);
            });
            
        });
    }

}