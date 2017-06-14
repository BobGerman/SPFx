import { IQuotation } from '../model/IQuotation';

export interface IQuoteGroupDisplayProps {
  getMoreLabel: string;
  quotes: IQuotation[];
  quoteCount: number;
}
