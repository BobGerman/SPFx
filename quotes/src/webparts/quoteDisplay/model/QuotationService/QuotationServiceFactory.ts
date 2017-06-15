import { IQuotationService } from './IQuotationService';
import MockQuotationService from './MockQuotationService';
import SPQuotationService from './SPQuotationService';

import { EnvironmentType } from '@microsoft/sp-core-library';

export class QuotationServiceFactory {
    public static getService(environmentType: EnvironmentType) : IQuotationService {

        if (environmentType === EnvironmentType.Local) {
          return new MockQuotationService();
        } else {
          return new SPQuotationService();
        }
    }
}