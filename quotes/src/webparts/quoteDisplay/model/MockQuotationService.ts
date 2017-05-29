import { IQuotation } from './IQuotation';

export default class MockQuotationService {

    private static _items: IQuotation[] =
        [ 
            { Title: "Anything that can go wrong will go wrong", Author: "Edward Murphy"},
            { Title: "Murphy was an optimist", Author: "Anonymous"}
        ];

    public static get(): Promise<IQuotation[]> {
        return new Promise<IQuotation[]>((resolve) => {
            resolve (MockQuotationService._items);
        });
    }
}