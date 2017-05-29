import * as React from 'react';
import * as ReactDom from 'react-dom';
import { 
  Version,
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'quoteDisplayStrings';
import QuoteDisplay from './components/QuoteDisplay';
import { IQuoteDisplayProps } from './components/IQuoteDisplayProps';
import { IQuoteDisplayWebPartProps } from './IQuoteDisplayWebPartProps';

import { IQuotation } from './model/QuoteDataModel';
import MockHttpClient from './model/MockHttpClient';

export default class QuoteDisplayWebPart extends BaseClientSideWebPart<IQuoteDisplayWebPartProps> {

  public render(): void {
    this.getQuotation().then ((quotation: IQuotation) => {
      const element: React.ReactElement<IQuoteDisplayProps > = React.createElement(
        QuoteDisplay,
        {
          Title: quotation.Title,
          Author: quotation.Author
        }
      );

      ReactDom.render(element, this.domElement);
    });
  }

  private getQuotation() : Promise<IQuotation> {
    return MockHttpClient.get()
      .then((data : IQuotation[]) => {
        var quotations: IQuotation = this.selectRandomQuotation(data);
        return quotations;
      }) as Promise<IQuotation>;
  }

  private selectRandomQuotation(quotes: IQuotation[]) : IQuotation {
    var index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }


  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
