import { IWebPartContext } from '@microsoft/sp-webpart-base';

export interface IListPickerProps {
    context: IWebPartContext;
    initialListName: string;
    onListSelectionChanged: (listName: string) => void;
}