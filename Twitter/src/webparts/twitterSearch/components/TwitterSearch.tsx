import * as React from 'react';
import styles from './TwitterSearch.module.scss';
// import { escape } from '@microsoft/sp-lodash-subset';
import { ITwitterService } from '../service/twitter/ITwitterService';
import { Tweets } from './Tweets';
import { PostTweet } from './PostTweet';
import { Message } from './Message';
import ITweet from '../model/ITweet';

export interface ITwitterSearchProps {
  query: string;
  twitterService: ITwitterService;
}

export interface ITwitterSearchState {
  isLoaded: boolean;
  message: string;
  tweets: ITweet[];
}

export class TwitterSearch extends React.Component<ITwitterSearchProps, ITwitterSearchState> {

  constructor(props: ITwitterSearchProps) {
    super(props);
    this.state = { isLoaded: false, message: "", tweets: [] };
  }

  public render(): React.ReactElement<ITwitterSearchProps> {

    if (!this.state.isLoaded) {

      this.props.twitterService.searchTweets(
        this.props.query
      )
        .then((tweets: ITweet[]) => {
          this.setState({ isLoaded: true, message: "", tweets: tweets });
        })
        .catch((message: string) => {
          this.setState({ isLoaded: true, message: message, tweets: [] });
        });
      return (<div>Loading...</div>);

    } else {

      return (
        <div>
          <div className={styles.twitterSearch}>
            <div className={styles.container}>
              <Tweets tweets={this.state.tweets}></Tweets>
              <Message message={this.state.message}></Message>
            </div>
          </div>
          <div className={styles.postTweet}>
            <div className={styles.container}>
              <PostTweet twitterService={this.props.twitterService} />
            </div>
          </div>
        </div>
      );

    }
  }
}
