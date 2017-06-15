import { IQuotationService } from './IQuotationService';
import { IQuotation } from './IQuotation';
import { IException } from '../IException';

import { IWebPartContext } from '@microsoft/sp-webpart-base';

export default class MockQuotationService implements IQuotationService {

    private mockItems: IQuotation[] =
        [ 
            { Title: "Anything that can go wrong will go wrong", Author: "Edward Murphy"},
            { Title: "Murphy was an optimist", Author: "Anonymous"}
        ];

    public get(context: IWebPartContext, listName: string): Promise<IQuotation[] | IException> {
        return new Promise<IQuotation[]>((resolve) => {
            resolve (this.mockItems);
        });
    }
}