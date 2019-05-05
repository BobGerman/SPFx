import * as React from 'react';
import styles from './TwitterSearch.module.scss';
// import { escape } from '@microsoft/sp-lodash-subset';
import { ITwitterService } from '../service/twitter/ITwitterService';
import Tweets, { ITweetsProps } from './Tweets';
import ITweet from '../model/ITweet';

export interface ITwitterSearchProps {
  query: string;
  twitterService: ITwitterService;
}

export interface ITwitterSearchState {
  isLoaded: boolean;
  tweets: ITweet[];
}

export class TwitterSearch extends React.Component<ITwitterSearchProps, ITwitterSearchState> {

  constructor (props: ITwitterSearchProps) {
    super(props);
    this.state = { isLoaded: false, tweets: [] };
  }

  public render(): React.ReactElement<ITwitterSearchProps> {

    if (!this.state.isLoaded) {
      this.props.twitterService.searchTweets(
        this.props.query
      )
      .then((tweets: ITweet[]) => {
        this.setState({ isLoaded: true, tweets: tweets });
      });  
    }

    return (
      <div className={ styles.twitterSearch }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <Tweets tweets={this.state.tweets}></Tweets>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
