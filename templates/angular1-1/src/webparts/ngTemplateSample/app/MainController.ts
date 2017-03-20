export interface IMainViewModel {
    MessageTo: string;              // Who is the mesage for, such as "World"
    GetSeparator: () => string;     // Method to get the weather forecast
    Styles: any;                    // Collection of CSS style names
}

export class MainController implements IMainViewModel {

    public static $inject = ["Styles"];
    
    // Define the ViewModel
    public MessageTo: string;
    public GetSeparator: () => string = this.getSeparator;

    constructor (public Styles: any, public MessageText: string) {  }

    private getSeparator() : string {
        return this.MessageTo ? ' ' : '';
    }

}
