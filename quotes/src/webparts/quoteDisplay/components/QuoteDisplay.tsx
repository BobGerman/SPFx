import { IQuotation } from '../model/QuoteDataModel';

import * as React from 'react';
import styles from './QuoteDisplay.module.scss';
import { IQuoteDisplayProps } from './IQuoteDisplayProps';
import { IQuoteDisplayState } from './IQuoteDisplayState';
import { escape } from '@microsoft/sp-lodash-subset';

export default class QuoteDisplay extends React.Component<IQuoteDisplayProps, IQuoteDisplayState> {

  public render(): React.ReactElement<IQuoteDisplayProps> {

    var quote = this.selectRandomQuotation(this.props.quotes);
    this.state = { displayedQuote: quote };

    return (
      <div className={styles.quotes}>
        <div className={styles.container}>
          <ul>
            <li className={styles.li}>{this.state.displayedQuote.Title}</li>
            <li className={styles.li2}>- {this.state.displayedQuote.Author}</li>
          </ul>
          <input type="button" value="Get quotes" onClick={this.handleClick.bind(this)} />
        </div>
      </div>
    );
  }

  private handleClick() {
    var quote = this.selectRandomQuotation(this.props.quotes);
    this.setState ({ displayedQuote: quote })
  }

  private selectRandomQuotation(quotes: IQuotation[]) : IQuotation {
    var index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }
}
