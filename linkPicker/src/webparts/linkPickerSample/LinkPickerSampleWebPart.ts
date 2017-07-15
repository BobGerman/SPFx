import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneButton, PropertyPaneButtonType
} from '@microsoft/sp-webpart-base';

import * as strings from 'linkPickerSampleStrings';
import LinkPickerSample from './components/LinkPickerSample';
import { ILinkPickerSampleProps } from './components/ILinkPickerSampleProps';
import { ILinkPickerSampleWebPartProps } from './ILinkPickerSampleWebPartProps';

export default class LinkPickerSampleWebPart extends BaseClientSideWebPart<ILinkPickerSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ILinkPickerSampleProps > = React.createElement(
      LinkPickerSample,
      {
        url: this.properties.url
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
                PropertyPaneButton("itemChangeLink",{
                  text: strings.SelectLink,
                  buttonType: PropertyPaneButtonType.Primary,
                  onClick: () => { alert('Somebody clicked me') }
                }),

                PropertyPaneTextField('url', {
                  label: strings.UrlFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
