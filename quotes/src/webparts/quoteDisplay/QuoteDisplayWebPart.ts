import * as React from 'react';
import * as ReactDom from 'react-dom';
import { 
  Version,
  Environment
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'QuoteDisplayWebPartStrings';
import QuoteGroupDisplay from './components/QuoteGroupDisplay/QuoteGroupDisplay';
import { IQuoteGroupDisplayProps } from './components/QuoteGroupDisplay/IQuoteGroupDisplayProps';
import ExceptionDisplay from './components/ExceptionDisplay/ExceptionDisplay';
import { IExceptionDisplayProps } from './components/ExceptionDisplay/IExceptionDisplayProps';

import { QuotationServiceFactory } from './model/QuotationService/QuotationServiceFactory';
import { IQuotation } from './model/QuotationService/IQuotation';
import { IException } from '../../model/Exceptions/IException';

import { PropertyPaneListPicker } from '../../components/propertyFieldListPicker/PropertyFieldListPicker';

export interface IQuoteDisplayWebPartProps {
  spListName: string;
  quoteCount: number;
}

export default class QuoteDisplayWebPart extends BaseClientSideWebPart<IQuoteDisplayWebPartProps> {

  public render(): void { 

    var service = QuotationServiceFactory.getService(Environment.type);

    service.get(this.context, this.properties.spListName)
    .then ((quotations: IQuotation[]) => {

      const element: React.ReactElement<IQuoteGroupDisplayProps> = React.createElement(
        QuoteGroupDisplay, {
           quotes: quotations,
           quoteCount: this.properties.quoteCount,
           getMoreLabel: strings.MoreButtonLabel
          },
      );

      ReactDom.render(element, this.domElement);
    })
    .catch ((exception: IException) => {

      const element: React.ReactElement<IExceptionDisplayProps > = React.createElement(
        ExceptionDisplay, {
          message: exception.message,
          statusCode: exception.status,
          statusText: exception.statusText,
          onEditWebPart: () => { this.context.propertyPane.open(); }
        }
      );

      ReactDom.render(element, this.domElement);
    });
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
                PropertyPaneListPicker('spListName', {
                  label: "My Label",
                  properties: this.properties,
                  context: this.context,
                  environment: Environment.type,
                  initialValue: this.properties.spListName,
                  key: "ListPicker",
                  render: this.render.bind(this),
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this)
                }),
                PropertyPaneSlider('quoteCount', {
                  label: strings.QuoteCountFieldLabel,
                  min: 1,
                  max: 5,
                  step: 1,
                  showValue: true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
