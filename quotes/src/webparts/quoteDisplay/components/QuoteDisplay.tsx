import * as React from 'react';
import styles from './QuoteDisplay.module.scss';
import { IQuoteDisplayProps } from './IQuoteDisplayProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class QuoteDisplay extends React.Component<IQuoteDisplayProps, void> {

  public render(): React.ReactElement<IQuoteDisplayProps> {
    return (
      <div className={styles.quotes}>
        <div className={styles.container}>
          <ul>
            <li className={styles.li}>{this.props.Title}</li>
            <li className={styles.li2}>- {this.props.Author}</li>
          </ul>
          <input type="button" value="Get quotes" onClick={this.handleClick.bind(this)} />
        </div>
      </div>
    );
  }

  private handleClick() {
    
  }

}
