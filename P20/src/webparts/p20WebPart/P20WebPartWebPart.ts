import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';

import * as strings from 'P20WebPartWebPartStrings';
import P20WebPart from './components/P20WebPart';
import { IP20WebPartProps } from './components/IP20WebPartProps';

export interface IP20WebPartWebPartProps {
  backgroundColor: string;
}

export default class P20WebPartWebPart extends BaseClientSideWebPart<IP20WebPartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IP20WebPartProps > = React.createElement(
      P20WebPart,
      {
        backgroundColor: this.properties.backgroundColor
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
                PropertyPaneDropdown('backgroundColor', {
                  label: strings.BackgroundColorFieldLabel,
                  options: [
                    { key: 'blue', text: "Blue" },
                    { key: 'green', text: "Green" },
                    { key: 'orange', text: "Orange" },
                    { key: 'red', text: "Red" }
                  ],
                  selectedKey: 'red'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
