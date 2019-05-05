import * as React from 'react';
import styles from './TwitterSearch.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

import ITweet from '../model/ITweet';

export interface ITweetsProps {
  tweets: ITweet[];
}

export default class TestWebApi extends React.Component<ITweetsProps, {}> {
  public render(): React.ReactElement<ITweetsProps> {
    return (
      <div className={ styles.twitterSearch }>
        <div className={ styles.container }>
          { this.props.tweets.map(p => (
          <div className={ styles.row }>
            <span className={ styles.column }>{escape(p.from)}</span>
            <span className={ styles.column }>{escape(p.text)}</span>
          </div>
          )) }
        </div>
      </div>
    );
  }
}
