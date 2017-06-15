import { IQuotation } from '../../model/QuotationService/IQuotation';

export interface IQuoteGroupDisplayProps {
  getMoreLabel: string;
  quotes: IQuotation[];
  quoteCount: number;
}
