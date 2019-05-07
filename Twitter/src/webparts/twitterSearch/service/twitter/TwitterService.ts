import ITweet from '../../model/ITweet';
import { ITwitterService, ITwitterServiceProps } from './ITwitterService';

import { AadHttpClient } from '@microsoft/sp-http';
import { IRawTweet } from './servicePayloads/IRawTweet';
import * as strings from 'TwitterSearchWebPartStrings';

export default class TwitterService implements ITwitterService {

    constructor(
        private serviceProps: ITwitterServiceProps
    ) { }

    public searchTweets(query: string):
        Promise<ITweet[] | string> {

        if (this.serviceProps.context && this.serviceProps.serviceScope &&
            this.serviceProps.clientId && this.serviceProps.searchEndPointUrl) {

            var aadClient: AadHttpClient =
                new AadHttpClient(this.serviceProps.serviceScope, this.serviceProps.clientId);

            return new Promise<ITweet[]>((resolve, reject) => {

                const headers: HeadersInit = new Headers();
                headers.append("Content-Type", "application/json");
                const body = {
                    "hashtag": query
                };

                aadClient.post(this.serviceProps.searchEndPointUrl, AadHttpClient.configurations.v1,
                    {
                        headers: headers,
                        body: JSON.stringify(body)
                    })
                    .then((res: any): Promise<any> => {
                        if (res && !res.ok) {
                            reject(`${strings.MessageError}: ${res.status} - ${res.statusText}`);
                        }
                        return res.json();
                    })
                    .then((rawTweets: IRawTweet[]) => {
                        let tweets: ITweet[] = rawTweets.map((value) => {
                            return {
                                text: value.TweetText,
                                from: `${value.UserDetails.FullName} (@${value.TweetedBy}) `,
                                dateTimeSent: new Date(value.CreatedAtIso),
                                imageUrl: value.UserDetails.ProfileImageUrl
                            };
                        });
                        resolve(tweets);
                    })
                    .catch((message) => {
                        reject(message);
                    });
            });
        } else {
            return new Promise<string>((resolve, reject) => {
                reject(strings.MessageNotConfigured);
            });
        }

    }

    public postTweet(text: string, query: string, ):
        Promise<void | string> {

        const aadClient: AadHttpClient =
            new AadHttpClient(this.serviceProps.serviceScope,
                this.serviceProps.clientId);

        const body = {
            "hashtag": query,
            "text": text
        };

        const headers: HeadersInit = new Headers();
        headers.append("Content-Type", "application/json");

        return new Promise<void | string>((resolve, reject) => {

            aadClient.post(this.serviceProps.postEndpointUrl, AadHttpClient.configurations.v1, {
                headers: headers,
                body: JSON.stringify(body)
            })
                .then((response) => {
                    if (response.status == 200) {
                        resolve();
                    } else {
                        reject(`Error: ${response.status}: ${response.statusText}`);
                    }
                })
                .catch((error) => {
                    reject(error);
                });

        });
    }
}