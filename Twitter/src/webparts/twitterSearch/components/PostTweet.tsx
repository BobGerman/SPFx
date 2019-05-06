import * as React from 'react';

import { escape } from '@microsoft/sp-lodash-subset';

import { PostTweetForm } from './PostTweetForm';
import { ITwitterService } from '../service/twitter/ITwitterService';
import * as strings from 'TwitterSearchWebPartStrings';

export interface IPostTweetProps {
  twitterService: ITwitterService;
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
                        onAddComment={ (c) => {
                          if (c) {
                            this.setState({
                              tweetText: c,
                              message: strings.MessageSending
                            });
                            this.props.twitterService.postTweet(
                              this.state.tweetText, ""
                            )
                            .then(() => {
                              this.setState({
                                tweetText: "",
                                message: strings.MessageTweetSent
                              });
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
