import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'TwitterSearchWebPartStrings';
import { TwitterSearch, ITwitterSearchProps } from './components/TwitterSearch';
import { ITwitterService, ITwitterServiceProps } from './service/twitter/ITwitterService';
import ServiceFactory from './service/ServiceFactory';

export interface ITwitterSearchWebPartProps {
  description: string;
}

export default class TwitterSearchWebPart extends BaseClientSideWebPart<ITwitterSearchWebPartProps> {

  private twitterService: ITwitterService;

  public render(): void {

    this.twitterService = ServiceFactory.getTwitterService(Environment.type, {
      context: this.context,
      serviceScope: this.context.serviceScope,
      clientId: "123",
      searchEndPointUrl: "#1",
      postEndpointUrl: "#2"
    });

    const element: React.ReactElement<ITwitterSearchProps> = React.createElement(
      TwitterSearch,
      {
        query: this.properties.description,
        twitterService: this.twitterService
      }
    );

    ReactDom.render(element, this.domElement);
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
