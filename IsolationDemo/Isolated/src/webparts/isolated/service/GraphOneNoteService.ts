import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';

import { IGraphItemService, IGraphItem } from './IGraphItemService';

import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

export default class GraphOneNoteService implements IGraphItemService {

    constructor(
        private context: WebPartContext,
        private serviceScope: ServiceScope) { }

    public get() {
        return new Promise<IGraphItem[] | string> ((resolve, reject) => {

            this.context.msGraphClientFactory
                .getClient()
                .then((client) => {
                    client
                    .api("me/onenote/notebooks")
                    .version("v1.0")
                    .get((error, response) => {
                        
                        if (error) {
    
                            reject(error.message);
    
                        } else {
    
                            const value: MicrosoftGraph.Notebook[] = response.value;
                            const result: IGraphItem[] = 
                                value.map<IGraphItem>((v) => { return {title: v.displayName}; });
                            resolve(result);
                        }
                    });                
    
                });
        });
    }

}