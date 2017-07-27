declare interface IPropertyFieldStrings {
  GuidanceMessageSegment1: string;
  GuidanceMessageSegment2: string;
  GuidanceMessageLink1Text: string;
}

declare module 'propertyFieldStrings' {
  const strings: IPropertyFieldStrings;
  export = strings;
}
