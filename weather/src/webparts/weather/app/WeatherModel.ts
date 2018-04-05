// IWeatherForecast - A weather forecast
export interface IWeatherForecast {
    City: string;
    Condition: string;
    Description: string;
    IconUrl: string;
    Temperatures: ITemperature[];
    Wind: number;
    Humidity: number;
}

// ITemperature - a single temperature referenced in a weather forecast
export interface ITemperature {
    Units: string;
    Current: number;
}

// IWeatherError - error encountered when retrieving the weather
export interface IWeatherError {
    ErrorMessage: string;
}
