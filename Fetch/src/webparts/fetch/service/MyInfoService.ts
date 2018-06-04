import { IMyInfoService } from './IMyInfoService';
import { IMyInfo } from '../model/IMyInfo';
import { ClientMode } from '../model/ClientModes';
import { ISubService } from './ISubService';

import { SSaadHttpClient } from './SSaadHttpClient';
import { SSgraphHttpClient } from './ssGraphHttpClient';
import { SShttpClient } from './SShttpClient';
import { SSmsGraphClient } from './SSmsGraphClient';
import { SSsimpleFetch } from './SSSimpleFetch';
import { SSspHttpClient } from './SSspHttpClient';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { MSGraphClient } from '@microsoft/sp-client-preview';

export default class MyInfoService implements IMyInfoService {

    private context: IWebPartContext;
    private serviceScope: ServiceScope;
    constructor(context: IWebPartContext, serviceScope: ServiceScope) {
        this.context = context;
        this.serviceScope = serviceScope;
    }

    // Get all or nothing
    public get(mode: ClientMode): Promise<IMyInfo | string> {

        let client: ISubService = null;

        switch (mode) {
            case ClientMode.aadHttp: {
                client = new SSaadHttpClient();
                break;
            }
            case ClientMode.graphHttpClient: {
                client = new SSgraphHttpClient();
                break;
            }
            case ClientMode.httpClient: {
                client = new SShttpClient();
                break;
            }
            case ClientMode.msGraphClient: {
                client = new SSmsGraphClient();
                break;
            }
            case ClientMode.simpleFetch: {
                client = new SSsimpleFetch();
                break;
            }
            case ClientMode.spHttpClient: {
                client = new SSspHttpClient();
                break;
            }
        }

        return client.getInfo(this.context, this.serviceScope);

    }

}