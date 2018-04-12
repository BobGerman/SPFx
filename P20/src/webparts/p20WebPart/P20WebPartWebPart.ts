import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'P20WebPartWebPartStrings';
import P20WebPart from './components/P20WebPart';
import { IP20WebPartProps } from './components/IP20WebPartProps';

export interface IP20WebPartWebPartProps {
  description: string;
}

export default class P20WebPartWebPart extends BaseClientSideWebPart<IP20WebPartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IP20WebPartProps > = React.createElement(
      P20WebPart,
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
