import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as angular from 'angular';
import {MainController} from './app/MainController';
import styles from './NgTemplateSample.module.scss';
import * as strings from 'ngTemplateSampleStrings';
import { INgTemplateSampleWebPartProps } from './INgTemplateSampleWebPartProps';

export default class NgTemplateSampleWebPart extends BaseClientSideWebPart<INgTemplateSampleWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {

    if (!this.renderedOnce) {

      this.domElement.innerHTML = require("./templates/main.template.html");

      // Configure the Angular app
      angular.module('templateSample1', [])
          .constant ('Styles', styles)
          .run(['$templateCache', ($templateCache) => {
            $templateCache.put("form-template",
              require("./templates/form.template.html"));
          }])
          .controller('MainController', MainController);

      // Run the angular app
      angular.bootstrap(this.domElement, ['templateSample1']);
    }

  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
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
              ]
            }
          ]
        }
      ]
    };
  }
}
