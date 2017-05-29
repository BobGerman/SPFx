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
import MockQuotationService from './model/MockQuotationService';
import SPQuotationService from './model/SPQuotationService';

export default class QuoteDisplayWebPart extends BaseClientSideWebPart<IQuoteDisplayWebPartProps> {

  public render(): void {
    this.getQuotation().then ((quotation: IQuotation[]) => {

      const element: React.ReactElement<IQuoteDisplayProps > = React.createElement(
        QuoteDisplay, { quotes: quotation }
      );

      ReactDom.render(element, this.domElement);
    });
  }

  private getQuotation() : Promise<IQuotation[]> {

    if (Environment.type === EnvironmentType.Local) {
      return MockQuotationService.get()
        .then((data : IQuotation[]) => {
          return data;
        }) as Promise<IQuotation[]>;
    } else {
      return SPQuotationService.get(this.context)
        .then((data : IQuotation[]) => {
          return data;
        }) as Promise<IQuotation[]>;
    }
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
