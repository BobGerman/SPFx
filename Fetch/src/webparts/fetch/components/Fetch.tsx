import * as React from 'react';
import styles from './Fetch.module.scss';
import { IFetchProps } from './IFetchProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Fetch extends React.Component<IFetchProps, {}> {
  public render(): React.ReactElement<IFetchProps> {

    var result: any;

    if (this.props.info !== null) {
      result = 
        <div className={styles.fetch}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Fetch Demo Web Part</span>
              <p className="ms-font-l ms-fontColor-white">
                Hello {escape(this.props.info.myName)}
              </p>
              <p>Lists in this site:</p>
              <ul>
                {this.props.info.spListNames.map(s => {
                  return <li>{s}</li>;
                })}
              </ul>
              <p>Top 10 customers:</p>
              <ul>
                {this.props.info.customers.map(s => {
                  return <li>{s}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>;
  } else {
    result = 
      <div className={styles.fetch}>
      <div className={styles.container}>
        <div className={`ms-Grid-row ms-bgColor-redDark ms-fontColor-white ${styles.row}`}>
          <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
            <span className="ms-font-xl ms-fontColor-white">Fetch Demo Web Part</span>
            <p className="ms-font-l ms-fontColor-white">{escape(this.props.message)}</p>
          </div>
        </div>
      </div>
    </div>;
  }

    return result;
  }
}
