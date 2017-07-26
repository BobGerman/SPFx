import * as React from 'react';
import * as ReactDom from 'react-dom';
import { 
  Version,
  Environment
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'quoteDisplayStrings';
import QuoteGroupDisplay from './components/QuoteGroupDisplay/QuoteGroupDisplay';
import { IQuoteGroupDisplayProps } from './components/QuoteGroupDisplay/IQuoteGroupDisplayProps';
import ExceptionDisplay from './components/ExceptionDisplay/ExceptionDisplay';
import { IExceptionDisplayProps } from './components/ExceptionDisplay/IExceptionDisplayProps';

import { IQuoteDisplayWebPartProps } from './IQuoteDisplayWebPartProps';

import { IListPickerProps } from '../../components/ListPicker/IListPickerProps';
import ListPicker from '../../components/ListPicker/ListPicker';

import { QuotationServiceFactory } from './model/QuotationService/QuotationServiceFactory';
import { IQuotation } from './model/QuotationService/IQuotation';
import { IException } from '../../model/Exceptions/IException';

export default class QuoteDisplayWebPart extends BaseClientSideWebPart<IQuoteDisplayWebPartProps> {

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
  
  public render(): void { 

    var service = QuotationServiceFactory.getService(Environment.type);

    service.get(this.context, this.properties.spListName)
    .then ((quotations: IQuotation[]) => {

      // const element: React.ReactElement<IQuoteGroupDisplayProps> = React.createElement(
      //   QuoteGroupDisplay, {
      //      quotes: quotations,
      //      quoteCount: this.properties.quoteCount,
      //      getMoreLabel: strings.MoreButtonLabel
      //     },
      // );
      const element: React.ReactElement<IListPickerProps> = React.createElement(
        ListPicker, {
          context: this.context,
          environmentType: Environment.type,
          initialListName: "",
          onListSelectionChanged: (name) => { console.log(name); }
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
                PropertyPaneTextField('spListName', {
                  label: strings.DescriptionFieldLabel
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
