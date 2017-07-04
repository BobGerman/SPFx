import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

import * as React from 'react';
import { IListPickerProps } from './IListPickerProps';
import { IListPickerState } from './IListPickerState';

import { Web } from 'sp-pnp-js';

export default class ListPicker extends React.Component<IListPickerProps, IListPickerState> {

  constructor() {
    super();
    this.state = {
      options: [],
      selectedItem: null
    };
  }

  public render(): React.ReactElement<IListPickerProps> {

    const context = this.props.context;

    // TODO: Add mock data
    var web = new Web(context.pageContext.web.absoluteUrl);
    web.lists.filter('hidden eq false and BaseTemplate eq 100').get()
    .then((lists: any) => {
      this.setState({ ...this.state,
        options: lists.map((li) => {
          return {
            key: li["Title"],
            text: li["Title"],
            selectedItem: false
          };
        })
      });
    });

    let { selectedItem } = this.state;

    return (
        <div>
        <Dropdown
          label='Controlled example:'
          selectedKey={ this.state.selectedItem && this.state.selectedItem.key }
          onChanged={ (item) => {
            this.props.onListSelectionChanged(item.text);
            this.setState({ ...this.state, selectedItem: item });
            }}
          options={this.state.options}
        />
        </div>
    );

  }
}
