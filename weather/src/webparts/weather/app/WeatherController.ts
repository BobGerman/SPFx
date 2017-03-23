// Weather Controller ViewModel
export interface IWeatherController {
    Forecast: IWeatherForecast,     // Forecast information
    Error: string,                  // Error message
    ValidDataLoaded: boolean,       // True if forecast contains valid data
    Styles: any,                    // CSS styles
    GetWeather: (string) => void    // Method to get the weather forecast
}

import {IWeatherForecast, ITemperature, IWeatherError} from './WeatherModel';
import {IWeatherService} from "./WeatherService";
import {IWeatherPropService} from "./WeatherPropService";
import {IWeatherWebPartProps} from "../IWeatherWebPartProps";

export class WeatherController implements IWeatherController {
    
    static $inject = ["WeatherService", "WeatherPropService", "WeatherStyles", "$timeout"];
    
    // Define the ViewModel
    public Forecast: IWeatherForecast;
    public Error: string;
    public ValidDataLoaded: boolean = false;
    public Styles: any = {};
    public GetWeather: (string) => void = this.getWeather;

    // Private members
    private timer: ng.IPromise<any> = null;
    private delay: number = 0;
    
    private TYPE_DELAY: number = 500;
    
    constructor (private WeatherService: IWeatherService,
                 private WeatherPropService: IWeatherPropService,
                 private WeatherStyles: any,
                 private $timeout: ng.ITimeoutService) {

        // Wire up event handler when web part properties are set
        this.Styles = WeatherStyles;
        WeatherPropService.SetPropertyUpdateHandler(this.updateProperties);
    }
    
    // Internal methods
    
    // updateProperties() - Called when web part properties are updated
    updateProperties = (props: IWeatherWebPartProps) : void => {
        
        let location = props.location;

        // Cancel any previous timers        
        if (this.timer) {
            this.$timeout.cancel(this.timer);
        }

        // If there is a location and it hasn't changed in TYPE_DELAY millisconds,
        // update the weather forecast
        if (location) {
            this.timer = this.$timeout(() => {
                this.getWeather(location);
                this.delay = this.TYPE_DELAY;
            }, this.delay);
        }
    }

    // getWeather() - Update the weather forecast
    getWeather(query: string) : void {
        
        this.WeatherService.GetWeather(query)
            .then ((result : IWeatherForecast) => {
                this.Forecast = result;
                this.ValidDataLoaded = true;
            })
            .catch ((reason : IWeatherError) => {
                this.Error = reason.ErrorMessage;
            })
            
    }     
}
