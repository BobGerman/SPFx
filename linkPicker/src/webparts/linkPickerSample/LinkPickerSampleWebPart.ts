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

import LinkPickerPanel from './components/LinkPickerPanel/LinkPickerPanel';
import { ILinkPickerPanelProps, LinkType } from './components/LinkPickerPanel/ILinkPickerPanelProps';

import LinkPickerSample from './components/LinkPickerSample';
import { ILinkPickerSampleProps } from './components/ILinkPickerSampleProps';

import { ILinkPickerSampleWebPartProps } from './ILinkPickerSampleWebPartProps';

export default class LinkPickerSampleWebPart extends BaseClientSideWebPart<ILinkPickerSampleWebPartProps> {

  private linkPickerPanel: LinkPickerPanel;

  public render(): void {

    const element: React.DOMElement<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> = 
      React.DOM.div({
        children: [
          React.createElement(
            LinkPickerSample,
            {
              webAbsUrl: this.context.pageContext.web.absoluteUrl,
              url: this.properties.url,
            }
          ),
          React.createElement(
            LinkPickerPanel,
            {
              webAbsUrl: this.context.pageContext.web.absoluteUrl,
              linkType: LinkType.any,
              ref: (ref) => { this.linkPickerPanel = ref; }
            }
          )
        ]
      });

      ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private getLink() {
    this.linkPickerPanel && this.linkPickerPanel.pickLink()
    .then ((url) => {
      this.properties.url = url;
      this.context.propertyPane.refresh();
    });
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
                  onClick: () => { this.getLink(); }
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
