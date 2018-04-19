declare interface IFetchWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ClientModeLabel: string;
  MsGraphClientMode: string;
  GraphHttpClientMode: string;
}

declare module 'FetchWebPartStrings' {
  const strings: IFetchWebPartStrings;
  export = strings;
}
