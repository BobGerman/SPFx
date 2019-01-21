import * as React from 'react';
import styles from './Demo.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

export interface IListOfStringsProps {
  title: string;
  description: string;
  item: string[];
}

export class ListOfStrings extends React.Component<IListOfStringsProps, {}> {
  public render(): React.ReactElement<IListOfStringsProps> {
    
    return (
      <div className={ styles.demo }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>{this.props.title}</span>
              <p className={ styles.subTitle }>{this.props.description}</p>
              <ul>
                {this.props.item.map((elt) => <li>{elt}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
