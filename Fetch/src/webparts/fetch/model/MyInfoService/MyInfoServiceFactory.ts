import { IMyInfoService } from './IMyInfoService';
import MockMyInfoService from './MockMyInfoService';
import MyInfoService from './MyInfoService';

import { EnvironmentType } from '@microsoft/sp-core-library';

export class MyInfoServiceFactory {
    public static getService(environmentType: EnvironmentType) : IMyInfoService {

        if (environmentType === EnvironmentType.Local) {
          return new MockMyInfoService();
        } else {
          return new MyInfoService();
        }
    }
}