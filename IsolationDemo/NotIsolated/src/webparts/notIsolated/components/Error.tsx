import * as React from 'react';
import styles from './Demo.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

export interface IErrorProps {
  title: string;
  description: string;
  errorMessage: string;
}

export class Error extends React.Component<IErrorProps, {}> {
  public render(): React.ReactElement<IErrorProps> {
    return (
      <div className={ styles.demo }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>{this.props.title}</span>
              <p className={ styles.subTitle }>{this.props.description}</p>
              <p className={ styles.description }>{this.props.errorMessage}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
