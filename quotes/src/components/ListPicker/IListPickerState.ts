import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export interface IListPickerState {
    options: IDropdownOption[];
    selectedKeyValue: string;
}