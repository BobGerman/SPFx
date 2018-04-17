declare interface IFetchWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ClientModeLabel: string;
}

declare module 'FetchWebPartStrings' {
  const strings: IFetchWebPartStrings;
  export = strings;
}
