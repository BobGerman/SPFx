import { IQuotation } from '../model/IQuotation';

import { CommandButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

import * as React from 'react';
import styles from './QuoteDisplay.module.scss';
import { IQuoteGroupDisplayProps } from './IQuoteGroupDisplayProps';
import { IQuoteGroupDisplayState } from './IQuoteGroupDisplayState';

export default class QuoteDisplay extends React.Component<IQuoteGroupDisplayProps, IQuoteGroupDisplayState> {

  private quotes: IQuotation[];

  public render(): React.ReactElement<IQuoteGroupDisplayProps> {

// TODO: Replace this with a shuffle
//    var quote = this.selectRandomQuotation(this.props.quotes);
    this.quotes = this.props.quotes;

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
            Get another quote
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
// TODO: Replace this with a shuffle
//    var quote = this.selectRandomQuotation(this.props.quotes);
    // Shuffle this.quotes
    this.setState ({ displayedQuotes: this.quotes });
  }

  private selectRandomQuotation(quotes: IQuotation[]) : IQuotation {
    if (quotes.length > 0) {
      var index = Math.floor(Math.random() * quotes.length);
      return quotes[index];
    } else {
      return null;
    }
  }
}
