//WeatherPropService Interface
export interface IWeatherPropService {
    SetPropertyUpdateHandler: (IWeatherWebPartProps) => void;
    UpdateProperties: (IWeatherWebPartProps) => void;
}

import {IWeatherWebPartProps} from '../IWeatherWebPartProps';

export class WeatherPropService implements IWeatherPropService {

    // Event handler to call when properties are updated
    private propertyUpdateHandler: (IWeatherWebPartProps) => void = null;
    
    // SetPropertyUpdateHandler() - Sets the event handler
    public SetPropertyUpdateHandler(propHandler: (IWeatherWebPartProps) => void) {
        this.propertyUpdateHandler = propHandler;
    }
    
    // UpdateProperties() Call to update the web part properties
    public UpdateProperties (props: IWeatherWebPartProps) {
        if (this.propertyUpdateHandler) {
            this.propertyUpdateHandler(props);
        }
    }

}
