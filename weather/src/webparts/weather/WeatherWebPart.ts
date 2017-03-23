// SPFx imports
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

// Web part imports
import styles from './Weather.module.scss';
import * as strings from 'weatherStrings';
import { IWeatherWebPartProps } from './IWeatherWebPartProps';

// Angular application imports
import * as angular from 'angular';
import {WeatherService} from './app/WeatherService';
import {WeatherPropService} from './app/WeatherPropService';
import {WeatherController} from './app/WeatherController';
var viewHtml = <string> require("./templates/WeatherView.template.html");

export default class WeatherWebPart extends BaseClientSideWebPart<IWeatherWebPartProps> {

  public render(): void {
    
      // The first time, set up the Angular app
      if(!this.renderedOnce) {

          // Adjust CSS classes to unique class names for this WP
          this.domElement.innerHTML = viewHtml;

          // Configure the Angular app
          angular.module('weatherWidget', [])
              .service('WeatherPropService', WeatherPropService)
              .service('WeatherService', WeatherService)
              .constant('WeatherStyles', styles)
              .constant ('appId', 'ecb1f756686518281c429bf5b7498d70')
              .controller('WeatherController', WeatherController);

          // Run the angular app
          angular.bootstrap(this.domElement, ['weatherWidget']);

      }

      // Every time we render, update the web part properties
      var service : any = 
        angular.element(this.domElement).injector().get('WeatherPropService');
      service.UpdateProperties(this.properties);

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
                PropertyPaneTextField('location', {
                  label: strings.LocationFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
