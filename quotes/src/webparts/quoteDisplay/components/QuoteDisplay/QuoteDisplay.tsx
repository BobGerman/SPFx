import { CommandButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

import * as React from 'react';
import styles from '../Quotes.module.scss';
import { IQuoteDisplayProps } from './IQuoteDisplayProps';

export default class QuoteDisplay extends React.Component<IQuoteDisplayProps, void> {

  public render(): React.ReactElement<IQuoteDisplayProps> {

    if (this.props.quote) {

      return (
          <div className="ms-font-xxl">
            <div className={styles.line}>{this.props.quote.Title}</div>
            <div className={styles.lastLine}>- {this.props.quote.Author}</div>
          </div>
      );

    } else {

      return (
        <div>Error: select a valid SharePoint list</div>
      );
      
    }
  }
}
