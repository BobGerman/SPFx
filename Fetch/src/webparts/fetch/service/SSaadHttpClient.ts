import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IMyInfo } from '../model/IMyInfo';
import { ISubService } from './ISubService';

export class SSaadHttpClient implements ISubService {

    getInfo(context: IWebPartContext, serviceScope: ServiceScope) {
        return new Promise<IMyInfo | string> ((resolve, reject) => {

            resolve ({
                "title": "Nothing yet",
                "items": ["Item1","Item2"]
            });
            
        });
    }

}