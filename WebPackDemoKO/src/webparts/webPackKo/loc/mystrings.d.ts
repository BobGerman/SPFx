declare interface IWebPackKoStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'webPackKoStrings' {
  const strings: IWebPackKoStrings;
  export = strings;
}
