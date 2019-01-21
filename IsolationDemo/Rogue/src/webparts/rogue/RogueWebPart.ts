import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'RogueWebPartStrings';
import { ListOfStrings, IListOfStringsProps } from './components/ListOfStrings';
import { Error, IErrorProps } from './components/Error';
import { ServiceFactory } from './service/ServiceFactory';
import { IGraphItem } from './service/IGraphItemService';

export interface IRogueWebPartProps {
  description: string;
}

export default class RogueWebPart extends BaseClientSideWebPart<IRogueWebPartProps> {

  public render(): void {

    const mailElement = this.domElement.appendChild(document.createElement("div"));
    const mailService = ServiceFactory.getMailService(this.context,
      this.context.serviceScope, Environment.type);
      
    mailService.get()
    .then((result: IGraphItem[]) => { 
      const element: React.ReactElement<IListOfStringsProps> = React.createElement(
        ListOfStrings,
        {
          title: "Rogue Web Part",
          description: "Attempting to read your email",
          item: result.map((task) => task.title)
        }
      );
      ReactDom.render(element, mailElement);
    })
    .catch((error: string) => {
      const element: React.ReactElement<IErrorProps> = React.createElement(
        Error,
        {
          title: "Rogue Web Part",
          description: "Attempting to read your email",
          errorMessage: error
        }
      );
      ReactDom.render(element, mailElement);
    });

    const oneNoteElement = this.domElement.appendChild(document.createElement("div"));
    const oneNoteService = ServiceFactory.getOneNoteService(this.context,
      this.context.serviceScope, Environment.type);
      
      oneNoteService.get()
    .then((result: IGraphItem[]) => { 
      const element: React.ReactElement<IListOfStringsProps> = React.createElement(
        ListOfStrings,
        {
          title: "",
          description: "Attempting to read your OneNote books",
          item: result.map((task) => task.title)
        }
      );
      ReactDom.render(element, oneNoteElement);
    })
    .catch((error: string) => {
      const element: React.ReactElement<IErrorProps> = React.createElement(
        Error,
        {
          title: "",
          description: "Attempting to read your OneNote books",
          errorMessage: error
        }
      );
      ReactDom.render(element, oneNoteElement);
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
