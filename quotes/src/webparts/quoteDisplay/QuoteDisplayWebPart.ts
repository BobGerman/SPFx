import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'quoteDisplayStrings';
import QuoteDisplay from './components/QuoteDisplay';
import { IQuoteDisplayProps } from './components/IQuoteDisplayProps';
import { IQuoteDisplayWebPartProps } from './IQuoteDisplayWebPartProps';

export default class QuoteDisplayWebPart extends BaseClientSideWebPart<IQuoteDisplayWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IQuoteDisplayProps > = React.createElement(
      QuoteDisplay,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
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
