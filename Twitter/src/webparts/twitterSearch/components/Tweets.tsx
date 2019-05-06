import * as React from 'react';
import styles from './TwitterSearch.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

import ITweet from '../model/ITweet';

export interface ITweetsProps {
  tweets: ITweet[];
}

export class Tweets extends React.Component<ITweetsProps, {}> {
  public render(): React.ReactElement<ITweetsProps> {
    let count = 0;

    return (
      <div className={styles.twitterSearch}>
        <div className={styles.container}>
          {this.props.tweets.map(p => (

            <div>
              {(count++ !== 0) ?
                <div className={styles.row}>
                  <div className={styles.fullColumn}>
                    <hr />
                  </div>
                </div>
                :
                <div className={styles.firstFullColumn}></div>
              }
              <div className={styles.row}>
                <div className={styles.imageColumn}>
                  <img className={styles.senderImage} src={escape(p.imageUrl)}></img>
                </div>
                <div className={styles.textColumn}>
                  <span className={styles.senderName}>{escape(p.from)}</span>
                  <br />
                  <span className={styles.tweetDate}>{escape(
                    `${p.dateTimeSent.toLocaleDateString()} ${p.dateTimeSent.toLocaleTimeString()}`)}</span>
                  <br />
                  <span className={styles.tweetText}>{p.text}</span>
                </div>

              </div>
            </div>
          ))}
          <div className={styles.firstFullColumn}></div>
        </div>
      </div>
    );
  }
}
