declare interface IQuoteDisplayStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'quoteDisplayStrings' {
  const strings: IQuoteDisplayStrings;
  export = strings;
}
