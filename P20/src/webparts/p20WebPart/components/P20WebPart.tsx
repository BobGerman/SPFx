import * as React from 'react';
import styles from './P20WebPart.module.scss';
import { IP20WebPartProps } from './IP20WebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class P20WebPart extends React.Component<IP20WebPartProps, {}> {
  public render(): React.ReactElement<IP20WebPartProps> {

    var rowStyle = styles.greenRow;

    return (
      <div className={ styles.p20WebPart }>
        <div className={ styles.container }>
          <div className={ styles.row + " " + rowStyle }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
