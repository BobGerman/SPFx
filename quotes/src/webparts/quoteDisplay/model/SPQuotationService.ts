import { IQuotation } from './QuoteDataModel';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';

export default class SPQuotationService {

    private static _items: IQuotation[] =
        [ 
            { Title: "XXAnything that can go wrong will go wrong", Author: "Edward Murphy"},
            { Title: "XXMurphy was an optimist", Author: "Anonymous"}
        ];

    public static get(context: IWebPartContext): Promise<IQuotation[]> {

        var url = context.pageContext.web.absoluteUrl + "/_api/lists/GetByTitle('TQuotes')/items";
        

        return context.spHttpClient.get(url, SPHttpClient.configurations.v1)
            .then ((response: SPHttpClientResponse) => {
                return response.json()
            })
            .then ((responseJSON: any) => {
                var result: IQuotation[] = [];

                // respnseJSON.value[0].Author0
                var responseItems = responseJSON.value;
                for (let q of responseItems) {
                    result.push ({
                        Title: q.Title,
                        Author: q.Author0
                    });
                }

                return result;
            });


        // return new Promise<IQuotation[]>((resolve) => {
        //     resolve (SPQuotationService._items);
        // });
    }
}