declare interface ITwitterSearchWebPartStrings {
  PropertyPaneDescription: string;
  QueryGroupName: string;
  ConnectionGroupName: string;
  QueryFieldLabel: string;
  ClientIdFieldLabel: string;
  SearchEndPointUrlFieldLabel: string;
  PostEndpointUrlFieldLabel: string;
}

declare module 'TwitterSearchWebPartStrings' {
  const strings: ITwitterSearchWebPartStrings;
  export = strings;
}
