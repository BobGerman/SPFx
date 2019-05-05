import * as React from 'react';
import styles from './TwitterSearch.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

export interface IMessageProps {
    message: string;
  } 

export class Message extends React.Component<IMessageProps, {}> {
  public render(): React.ReactElement<IMessageProps> {
    return (
      <div className={ styles.twitterSearch }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <span className={ styles.textColumn }>
              { escape(this.props.message) }
            </span>
          </div>
        </div>
      </div>
    );
  }
}
