import { IQuotation } from '../model/IQuotation';

import { CommandButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

import * as React from 'react';
import styles from './QuoteDisplay.module.scss';
import { IQuoteDisplayProps } from './IQuoteDisplayProps';
import { IQuoteDisplayState } from './IQuoteDisplayState';

export default class QuoteDisplay extends React.Component<IQuoteDisplayProps, IQuoteDisplayState> {

  public render(): React.ReactElement<IQuoteDisplayProps> {

    var quote = this.selectRandomQuotation(this.props.quotes);
    if (quote) {
      this.state = { displayedQuote: quote };

      return (
        <div className={styles.quotes}>
          <div className="ms-font-xxl">
            <div className={styles.line}>{this.state.displayedQuote.Title}</div>
            <div className={styles.lastLine}>- {this.state.displayedQuote.Author}</div>
          </div>
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
    var quote = this.selectRandomQuotation(this.props.quotes);
    this.setState ({ displayedQuote: quote });
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
