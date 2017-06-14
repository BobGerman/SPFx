declare interface IQuoteDisplayStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  QuoteCountFieldLabel: string;
  MoreButtonLabel: string;
}

declare module 'quoteDisplayStrings' {
  const strings: IQuoteDisplayStrings;
  export = strings;
}
