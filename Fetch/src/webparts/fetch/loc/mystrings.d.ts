declare interface IFetchWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'FetchWebPartStrings' {
  const strings: IFetchWebPartStrings;
  export = strings;
}
