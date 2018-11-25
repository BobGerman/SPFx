declare interface IFetchWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ClientModeLabel: string;
  SimpleFetchMode: string;
  HttpClientMode: string;
  SpHttpClientMode: string;
  MsGraphClientMode: string;
  AadHttpClient: string;
}

declare module 'FetchWebPartStrings' {
  const strings: IFetchWebPartStrings;
  export = strings;
}
