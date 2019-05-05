import * as React from 'react';
import styles from './TwitterSearch.module.scss';
import { ITwitterSearchProps } from './ITwitterSearchProps';
import { escape } from '@microsoft/sp-lodash-subset';

export interface IExceptionProps {
    message: string;
  } 

export default class Exception extends React.Component<IExceptionProps, {}> {
  public render(): React.ReactElement<IExceptionProps> {
    return (
      <div className={ styles.twitterSearch }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <span className={ styles.column }>
              { escape(this.props.message) }
            </span>
          </div>
        </div>
      </div>
    );
  }
}
