import * as React from 'react';
import styles from './LinkPickerSample.module.scss';
import { ILinkPickerSampleProps } from './ILinkPickerSampleProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class LinkPickerSample extends React.Component<ILinkPickerSampleProps, void> {
  public render(): React.ReactElement<ILinkPickerSampleProps> {
    return (
      <div className={styles.linkPickerSample}>
        <div className={styles.container}>
          <img src={this.props.url} />
        </div>
      </div>
    );
  }
}
