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
    this.quotes = this.shuffleQuotes(this.props.quotes);

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
    this.setState ({ displayedQuotes: this.shuffleQuotes(this.quotes) });
  }

  private shuffleQuotes(quotes: IQuotation[]) : IQuotation[] {
    
    var result = quotes;

    if (result.length > 1) {
      for (let i=0; i<result.length-1; i++) {
        let r = i + Math.floor(Math.random() * result.length-i);
        let temp = result[i];
        result[i] = result[r];
        result[r] = temp;
      }
    }

    return result;

  }
}
