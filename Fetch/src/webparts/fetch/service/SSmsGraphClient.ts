import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IMyInfo } from '../model/IMyInfo';
import { ISubService } from './ISubService';

import { MSGraphClient } from '@microsoft/sp-client-preview';

export class SSmsGraphClient implements ISubService {

    public getInfo(context: IWebPartContext, serviceScope: ServiceScope) {
        return new Promise<IMyInfo | string> ((resolve, reject) => {

            resolve ({
                "title": "Nothing yet",
                "items": ["Item1","Item2"]
            });
            
        });
    }

}