// The left navigation selects what kind of link picking to do
export enum NavState { site, link }

export interface ILinkPickerPanelState {
    navState?: NavState;    // the navigation selection
    isStarted?: boolean;    // true if the message handler is running
    isUrlValid?: boolean;   // true if the URL is valid
    url?: string;           // the link
}