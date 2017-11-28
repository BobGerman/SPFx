import { IQuotationService } from './IQuotationService';
import { IQuotation } from './IQuotation';
import { IException } from '../../../../model/Exceptions/IException';
import { ISPQuotesListResponse } from './ISPQuotesListResponse';

import { IWebPartContext } from '@microsoft/sp-webpart-base';

import { Web } from 'sp-pnp-js';

export default class SPQuotationService implements IQuotationService {

    // ORIGINAL with Promises

    // public get(context: IWebPartContext, listName: string): Promise<IQuotation[] | IException> {
        
    //             return new Promise<IQuotation[] | IException>((resolve,reject) => {
        
    //                 var web = new Web(context.pageContext.web.absoluteUrl);
                    
    //                 web.lists.getByTitle(listName).items.select('Title','Author0').get()
    //                 .then((listItems: ISPQuotesListResponse[]) => {
        
    //                     var result: IQuotation[] = [];
        
    //                     for (let q of listItems) {
    //                         result.push ({
    //                             Title: q.Title,
    //                             Author: q.Author0
    //                         });
    //                     }
        
    //                     resolve(result);
    //                 })
    //                 .catch ((response: any) => {
    //                     reject({
    //                         status: response.status,
    //                         statusText: response.statusText,
    //                         message: `Error retrieving SharePoint list ${listName}`
    //                     });
    //                 });
    //             });
    //         }
    //     }
    // }

    // NOW with async/await

    public async get(context: IWebPartContext, listName: string): Promise<IQuotation[] | IException> {

        try {
            var web = new Web(context.pageContext.web.absoluteUrl);
            var listItems: ISPQuotesListResponse[] =
                await web.lists.getByTitle(listName).items.select('Title','Author0').get();
    
            var result: IQuotation[] = [];
            
            for (let q of listItems) {
                result.push ({
                    Title: q.Title,
                    Author: q.Author0
                });
            }
         
            return result;
        }
        catch (response) {
            throw({
                status: response.status,
                statusText: response.statusText,
                message: `Error retrieving SharePoint list ${listName}`
            });
        }
    }
}