import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import * as React from 'react';
import { IListPickerProps } from './IListPickerProps';
import { IListPickerState } from './IListPickerState';

export default class ListPicker extends React.Component<IListPickerProps, IListPickerState> {

  constructor() {
    super();
    this.state = {selectedItem: { key: 'A', 'text': 'Option a'} };
  }

  public render(): React.ReactElement<IListPickerProps> {

    let x=100;
    let { selectedItem } = this.state;

    return (
        <div>
        <Dropdown
          label='Controlled example:'
          selectedKey={ selectedItem && selectedItem.key }
          onChanged={ (item) => {
            this.setState({ selectedItem: item });
            alert(`You selected ${item.text}`);
            }}
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'E', text: 'Option e' },
              { key: 'F', text: 'Option f' },
              { key: 'G', text: 'Option g' },
            ]
          }
        />
        </div>
    );

  }
}
