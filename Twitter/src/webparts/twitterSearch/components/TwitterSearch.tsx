import * as React from 'react';
import styles from './TwitterSearch.module.scss';
import { ITwitterService } from '../service/twitter/ITwitterService';
import { Tweets } from './Tweets';
import { PostTweet } from './PostTweet';
import { Message } from './Message';
import ITweet from '../model/ITweet';
import { Requests } from './Requests';
import IRequest from '../model/IRequest';
import { IRequestService } from '../service/request/IRequestService';

export interface ITwitterSearchProps {
  query: string;
  showRequests: boolean;
  twitterService: ITwitterService;
  requestService: IRequestService;
}

export enum LoadingState {
  initial, loading, loaded, awaitingRefresh
}

export interface ITwitterSearchState {
  tweetsLoadingState: LoadingState;
  tweetRefreshCount: number;
  requestsLoadingState: LoadingState;
  requestRefreshCount: number;
  message: string;
  tweets: ITweet[];
  requests: IRequest[];
}

export class TwitterSearch extends React.Component<ITwitterSearchProps, ITwitterSearchState> {

  private tweetRefreshInterval = 10000;  // Refresh every 10 seconds
  private tweetRefeshCount = 12;         // for 2 minutes
  private requestRefreshInterval = 5000; // Refresh every 5 seconds
  private requestRefeshCount = 120;     // for 10 minutes

  constructor(props: ITwitterSearchProps) {
    super(props);
    this.state = {
      tweetsLoadingState: LoadingState.initial,
      tweetRefreshCount: this.tweetRefeshCount,
      requestsLoadingState: LoadingState.initial,
      requestRefreshCount: this.requestRefeshCount,
      message: "",
      tweets: [],
      requests: []
    };
  }

  public render(): React.ReactElement<ITwitterSearchProps> {

    if (this.state.tweetsLoadingState === LoadingState.initial) {
      this.loadTweets(this.state.tweetRefreshCount);
    } else if (this.state.tweetsLoadingState === LoadingState.loaded &&
      this.state.tweetRefreshCount > 0) {
      setTimeout(function () {
        this.loadTweets(this.state.tweetRefreshCount - 1);
      }.bind(this), this.tweetRefreshInterval);
      this.setState({ tweetsLoadingState: LoadingState.awaitingRefresh });
    }

    if (this.props.showRequests) {
      if (this.state.requestsLoadingState === LoadingState.initial) {
        this.loadRequests(this.state.requestRefreshCount);
      } else if (this.state.requestsLoadingState === LoadingState.loaded &&
        this.state.requestRefreshCount > 0) {
        setTimeout(function () {
          this.loadRequests(this.state.requestRefreshCount - 1);
        }.bind(this), this.requestRefreshInterval);
        this.setState({ requestsLoadingState: LoadingState.awaitingRefresh });
      }
    }

    if (this.state.tweets.length <= 0 &&
      this.state.requests.length <= 0) {

      return (<div>Loading...</div>);

    } else {

      return (
        <div>
          <div className={styles.twitterSearch}>
            <div className={styles.container}>
              <Tweets tweets={this.state.tweets}></Tweets>
            </div>
          </div>
          <div className={styles.requestList}>
            <div className={styles.container}>
              <Requests requests={this.state.requests}></Requests>
            </div>
          </div>
          <div className={styles.messagePanel}>
            <div className={styles.container}>
              <Message message={this.state.message}></Message>
            </div>
          </div>
          <div className={styles.postTweet}>
            <div className={styles.container}>
              <PostTweet twitterService={this.props.twitterService}
                onRefresh={this.refresh.bind(this)}
                query={this.props.query} />
            </div>
          </div>
        </div>
      );

    }
  }

  private loadTweets(remainingRefreshCount: number) {
    // if (this.state.tweetsLoadingState !== LoadingState.loading) {
    this.props.twitterService.searchTweets(this.props.query)
      .then((tweets: ITweet[]) => {
        this.setState({
          tweetRefreshCount: remainingRefreshCount,
          tweetsLoadingState: LoadingState.loaded,
          message: "",
          tweets: tweets
        });
      })
      .catch((message: string) => {
        this.setState({
          tweetRefreshCount: remainingRefreshCount,
          tweetsLoadingState: LoadingState.loaded,
          message: message,
          tweets: []
        });
      });
    this.setState({ tweetsLoadingState: LoadingState.loading });
    // }
  }

  private loadRequests(remainingRefreshCount: number) {
    // if (this.state.requestsLoadingState !== LoadingState.loading) {
    this.props.requestService.getRequestsForCurrentUser()
      .then((requests: IRequest[]) => {
        this.setState({
          requestsLoadingState: LoadingState.loaded,
          requestRefreshCount: remainingRefreshCount,
          message: "",
          requests: requests
        });
      })
      .catch((message: string) => {
        this.setState({
          requestsLoadingState: LoadingState.loaded,
          requestRefreshCount: remainingRefreshCount,
          message: message,
          requests: []
        });
      });
    this.setState({ requestsLoadingState: LoadingState.loading });
    // }
  }

  private refresh() {
    this.setState({
      tweetsLoadingState: LoadingState.initial,
      tweetRefreshCount: this.tweetRefeshCount,
      requestsLoadingState: LoadingState.initial,
      requestRefreshCount: this.requestRefeshCount,
      message: "Loading"
    });
  }
}
