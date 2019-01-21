import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'NotIsolatedWebPartStrings';
import { ListOfStrings, IListOfStringsProps } from './components/ListOfStrings';
import { ServiceFactory } from './service/ServiceFactory';
import { IGraphItem } from './service/IGraphItemService';

export interface INotIsolatedWebPartProps {
  description: string;
}

export default class NotIsolatedWebPart extends BaseClientSideWebPart<INotIsolatedWebPartProps> {

  public render(): void {

    const title = "Not isolated";
    const description = "This web part has permission to read your email";

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
      const element: React.ReactElement<IListOfStringsProps > = React.createElement(
        ListOfStrings,
        {
          title: title,
          description: description,
          item: ["Error!", error]
        }
      );
      ReactDom.render(element, this.domElement);
    });

  }

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
