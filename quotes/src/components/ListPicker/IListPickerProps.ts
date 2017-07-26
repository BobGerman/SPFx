import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { EnvironmentType } from '@microsoft/sp-core-library';

export interface IListPickerProps {
    context: IWebPartContext;
    environmentType: EnvironmentType;
    initialListName: string;
    onListSelectionChanged: (listName: string) => void;
}