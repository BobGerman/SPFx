import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-webpart-base';

import * as strings from 'FetchWebPartStrings';
import Fetch from './components/Fetch';
import { IFetchProps } from './components/IFetchProps';

import { IMyInfo } from './model/IMyInfo';
import { ClientMode } from './model/ClientModes';
import { IMyInfoService } from './service/IMyInfoService';
import { MyInfoServiceFactory } from './service/MyInfoServiceFactory';

export interface IFetchWebPartProps {
  clientMode: string;
}

export default class FetchWebPart extends BaseClientSideWebPart<IFetchWebPartProps> {

  public render(): void {

    let service = MyInfoServiceFactory.getService(this.context, Environment.type);
    service.get()
    .then((result: IMyInfo) => {      
      const element: React.ReactElement<IFetchProps> = React.createElement(
        Fetch,
        {
          info: result,
          message: ""
        }
      );
  
      ReactDom.render(element, this.domElement);
    })
    .catch((message: string) => {
      const element: React.ReactElement<IFetchProps > = React.createElement(
        Fetch,
        {
          info: null,
          message: `ERROR: ${message}`
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
                PropertyPaneChoiceGroup('clientMode', {
                  label: strings.ClientModeLabel,
                  options: [
                    { key: ClientMode.aadHttpClient, text: "AadHttpClient" },
                    { key: ClientMode.graphHttpClient, text: "MSGraphClient" },
                    { key: ClientMode.msGraphClient, text: "GraphHttpClient (deprecated)" }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
