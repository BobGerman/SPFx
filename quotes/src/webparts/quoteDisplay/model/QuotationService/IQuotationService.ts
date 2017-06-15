import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IQuotation } from './IQuotation';
import { IException } from '../IException';

export interface IQuotationService {
    get(context: IWebPartContext, listName: string): Promise<IQuotation[] | IException>;
}