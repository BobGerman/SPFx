import { IQuotation } from './IQuotation';
import { IGetQuotesResponse } from './SPResponse';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';

export default class SPQuotationService {

    public static get(context: IWebPartContext, listName: string): Promise<IQuotation[]> {

        var url = context.pageContext.web.absoluteUrl + "/_api/lists/GetByTitle('" + listName + "')/items";
        
        return context.spHttpClient.get(url, SPHttpClient.configurations.v1)
            .then ((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then ((responseJSON: IGetQuotesResponse) => {
                var result: IQuotation[] = [];

                var responseItems = responseJSON.value;
                for (let q of responseItems) {
                    result.push ({
                        Title: q.Title,
                        Author: q.Author0
                    });
                }

                return result;
            })
            .catch ((response: SPHttpClientResponse) => {
                // For now, any error does the same thing
                return [];
            });
    }

}