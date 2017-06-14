declare interface IQuoteDisplayStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  QuoteCountFieldLabel: string;
}

declare module 'quoteDisplayStrings' {
  const strings: IQuoteDisplayStrings;
  export = strings;
}
