import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";

import * as strings from 'IsolatedWebPartStrings';
import { ListOfStrings, IListOfStringsProps } from './components/ListOfStrings';
import { Error, IErrorProps } from './components/Error';
import { ServiceFactory } from './service/ServiceFactory';
import { IGraphItem } from './service/IGraphItemService';


export interface IIsolatedWebPartProps {
  description: string;
}

export default class IsolatedWebPart extends BaseClientSideWebPart<IIsolatedWebPartProps> {

  public render(): void {
    const title = "Isolated";
    const description = "This web part has permission to read your OneNote notebooks";

    const service = ServiceFactory.getService(this.context,
      this.context.serviceScope, Environment.type);
    service.get()
    .then((result: IGraphItem[]) => { 
      const element: React.ReactElement<IListOfStringsProps > = React.createElement(
        ListOfStrings,
        {
          title: title,
          description: description,
          item: result.map((task) => task.title)
        }
      );
      ReactDom.render(element, this.domElement);
    })
    .catch((error: string) => {
      const element: React.ReactElement<IErrorProps> = React.createElement(
        Error,
        {
          title: title,
          description: description,
          errorMessage: error
        }
      );
      ReactDom.render(element, this.domElement);
    });  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
