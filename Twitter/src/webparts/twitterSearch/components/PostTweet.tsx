import * as React from 'react';

import { escape } from '@microsoft/sp-lodash-subset';

import { PostTweetForm } from './PostTweetForm';
import { ITwitterService } from '../service/twitter/ITwitterService';
import * as strings from 'TwitterSearchWebPartStrings';

export interface IPostTweetProps {
  twitterService: ITwitterService;
  query: string;
  onRefresh: () => void;
}

export interface IPostTweetState {
  tweetText: string;
  message: string;
}

export class PostTweet extends React.Component<IPostTweetProps, IPostTweetState> {

  private inputElement: HTMLInputElement;

  constructor (properties: IPostTweetProps) {
    super(properties);
    this.state = {
      tweetText: "",
      message: ""
    };
  }

  public render(): React.ReactElement<IPostTweetProps> {
    return (
      <div>
        <PostTweetForm  title={strings.PostTweetLabel}
                        commentText={ this.state.tweetText }
                        onRefresh={ this.props.onRefresh}
                        onAddComment={ (c) => {
                          if (c) {
                            this.setState({
                              tweetText: c,
                              message: strings.MessageSending
                            });
                            this.props.twitterService.postTweet(
                              this.state.tweetText,
                              this.props.query
                            )
                            .then(() => {
                              this.setState({
                                tweetText: "",
                                message: strings.MessageTweetSent
                              });
                              this.props.onRefresh();
                            })
                            .catch((error) => {
                              this.setState({
                                tweetText: c,
                                message: `${strings.MessageError} ${escape(error)}`
                              });
                            });
                          } else {
                            this.setState ( {...this.state, message: strings.MessagePleaseEnter});
                          }
                        }
                      }
                      onChangeComment={ (c) => {
                        this.setState({
                          tweetText: c,
                          message: ""
                        });
                      } }
                      onCancel={ () => {
                        this.setState({
                          tweetText: "",
                          message: ""
                        });
                      } }
                      message={ this.state.message } />
      </div>
    );
  }

}
