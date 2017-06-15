import { IQuotation } from '../../model/IQuotation';

import { CommandButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

import * as React from 'react';
import styles from '../Quotes.module.scss';
import { IQuoteGroupDisplayProps } from './IQuoteGroupDisplayProps';
import { IQuoteGroupDisplayState } from './IQuoteGroupDisplayState';

export default class QuoteDisplay extends React.Component<IQuoteGroupDisplayProps, IQuoteGroupDisplayState> {

  private quotes: IQuotation[];

  public render(): React.ReactElement<IQuoteGroupDisplayProps> {

    this.quotes = this.shuffle<IQuotation>(
      this.props.quotes,
      this.props.quoteCount
      );

    if (this.props.quotes) {
      this.state = { displayedQuotes: this.quotes };

      return (
        <div className={styles.quotes}>
          {this.quotes.map(q =>(
            <div className="ms-font-xxl">
              <div className={styles.line}>{q.Title}</div>
              <div className={styles.lastLine}>- {q.Author}</div>
            </div>
          ))}
          <CommandButton className={styles.lastLine} icon='Refresh' onClick={this.handleClick.bind(this)}>
            {this.props.getMoreLabel}
          </CommandButton>
        </div>
      );
        
    } else {

      return (
        <div>Error: select a valid SharePoint list</div>
      );
      
    }
  }

  private handleClick() {
    this.setState ({ displayedQuotes: this.shuffle<IQuotation>(
      this.quotes,
      this.props.quoteCount
      ) });
  }

  private shuffle<T>(items: T[], itemCount: number) : T[] {

    var result: T[] = [];
    var n = items.length;

    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    if (n > 1) {
      for (let i=0; i<n-1; i++) {
        let r = 1 + i + Math.floor(Math.random() * n-i-1);
        let temp = items[i];
        items[i] = items[r];
        items[r] = temp;
      }
      for (let i=0; i<Math.min(itemCount, items.length); i++){
        result.push(items[i]);
      }
    }

    return result;
  }

  private truncate<T>(items: T[], itemCount: number) : T[] {
    var result: T[] = [];

    for (let i=0; i<Math.min(itemCount, items.length); i++){
      result.push(items[i]);
    }

    return result;
  }

}
