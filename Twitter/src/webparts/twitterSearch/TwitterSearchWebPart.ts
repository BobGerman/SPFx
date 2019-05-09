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
import { ITwitterService } from './service/twitter/ITwitterService';
import { IRequestService } from './service/request/IRequestService';
import ServiceFactory from './service/ServiceFactory';

export interface ITwitterSearchWebPartProps {
  query: string;
  clientId: string;
  searchEndPointUrl: string;
  postEndpointUrl: string;
  requestList: string;
}

export default class TwitterSearchWebPart extends BaseClientSideWebPart<ITwitterSearchWebPartProps> {

  private twitterService: ITwitterService;
  private requestService: IRequestService;

  protected get disableReactivePropertyChanges(): boolean { return true; }

  public render(): void {

    this.twitterService = ServiceFactory.getTwitterService(Environment.type, {
      context: this.context,
      serviceScope: this.context.serviceScope,
      clientId: this.properties.clientId,
      searchEndPointUrl: this.properties.searchEndPointUrl,
      postEndpointUrl: this.properties.postEndpointUrl
    });

    this.requestService = ServiceFactory.getRequestService(Environment.type, {
      context: this.context,
      serviceScope: this.context.serviceScope,
      listName: "requestList"
    });

    const element: React.ReactElement<ITwitterSearchProps> = React.createElement(
      TwitterSearch,
      {
        query: this.properties.query,
        twitterService: this.twitterService,
        requestService: this.requestService
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
              groupName: strings.QueryGroupName,
              groupFields: [
                PropertyPaneTextField('query', {
                  label: strings.QueryFieldLabel
                })
              ]
            },
            {
              groupName: strings.ConnectionGroupName,
              groupFields: [
                PropertyPaneTextField('clientId', {
                  label: strings.ClientIdFieldLabel
                }),
                PropertyPaneTextField('searchEndPointUrl', {
                  label: strings.SearchEndPointUrlFieldLabel
                }),
                PropertyPaneTextField('postEndpointUrl', {
                  label: strings.PostEndpointUrlFieldLabel
                }),
                PropertyPaneTextField('requestList', {
                  label: strings.RequestListLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
