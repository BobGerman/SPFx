declare interface ITwitterSearchWebPartStrings {
  PropertyPaneDescription: string;
  QueryGroupName: string;
  ConnectionGroupName: string;
  QueryFieldLabel: string;
  ClientIdFieldLabel: string;
  SearchEndPointUrlFieldLabel: string;
  PostEndpointUrlFieldLabel: string;
  AddButtonLabel: string;
  CancelButtonLabel: string;
  RefreshButtonLabel: string;
  PostTweetLabel: string;
  MessageError: string;
  MessageSending: string;
  MessageTweetSent: string;
  MessagePleaseEnter: string;
  MessageNotConfigured: string;
  MessageNoTweets: string;
}

declare module 'TwitterSearchWebPartStrings' {
  const strings: ITwitterSearchWebPartStrings;
  export = strings;
}
