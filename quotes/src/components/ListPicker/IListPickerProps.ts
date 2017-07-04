export interface IListPickerProps {
    webUrl: string;
    initialListName: string;
    onListSelectionChanged: (listName: string) => void;
}