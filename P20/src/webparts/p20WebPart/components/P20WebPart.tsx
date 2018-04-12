import * as React from 'react';
import styles from './P20WebPart.module.scss';
import { IP20WebPartProps } from './IP20WebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class P20WebPart extends React.Component<IP20WebPartProps, {}> {
  public render(): React.ReactElement<IP20WebPartProps> {

    var rowStyle;
    switch (this.props.backgroundColor) {
      case 'blue': {
        rowStyle = styles.blueRow;
        break;
      }
      case 'green': {
        rowStyle = styles.greenRow;
        break;
      }
      case 'orange': {
        rowStyle = styles.orangeRow;
        break;
      }
      default: {
        rowStyle = styles.redRow;
        break;
      }
    }

    return (
      <div className={ styles.p20WebPart }>
        <div className={ styles.container }>
          <div className={ styles.row + " " + rowStyle }>
            <div className={ styles.column }>
              <span className={ styles.title }>Congratulations!</span>
              <p className={ styles.subTitle }>You have completed a P20 challenge</p>
              <hr />
              <p className={ styles.title }>{'\u2B50'} WELCOME TO AUSTIN {'\u2B50'}</p>
              <a href="https://austin.eater.com/maps/best-barbecue-austin-restaurants" className={ styles.button } target="_blank">
                <span className={ styles.label }>Find Barbecue</span>
              </a>&nbsp;
              <a href="https://www.austintexas.org/music-scene/" className={ styles.button } target="_blank">
                <span className={ styles.label }>Find Music</span>
              </a>&nbsp;
              <a href="https://www.microsoft.com/en-us/about/officelocator/default.aspx?Location=78759" className={ styles.button } target="_blank">
                <span className={ styles.label }>Find Geeks</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
