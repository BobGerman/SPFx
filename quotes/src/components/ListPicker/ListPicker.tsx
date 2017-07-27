import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

import * as React from 'react';
import { IListPickerProps } from './IListPickerProps';
import { IListPickerState } from './IListPickerState';

import { EnvironmentType } from '@microsoft/sp-core-library';

import { Web } from 'sp-pnp-js';

export default class ListPicker extends React.Component<IListPickerProps, IListPickerState> {

  constructor() {
    super();
    this.state = {
      options: [],
      selectedItem: ""
    };
  }

  public render(): React.ReactElement<IListPickerProps> {

    const context = this.props.context;

    if (this.props.environmentType === EnvironmentType.SharePoint) {
      // Set options using lists within this site
      var web = new Web(context.pageContext.web.absoluteUrl);
      web.lists.filter('hidden eq false and BaseTemplate eq 100').get()
      .then((lists: any) => {
        this.setState({ ...this.state,
          options: lists.map((li) => {
            return {
              key: li["Title"],
              text: li["Title"],
              selected: li["Title"] == (this.state.selectedItem || this.props.initialListName)
            };
          })
        });
      });
    } else {
      // Set options using mock data
      // Can't set the state inside render or it will recurse endlessly
      setTimeout(() => {    
        this.setState({ ...this.state,
          options: [
            {key: "List A", text: "List A", selected: false},
            {key: "List B", text: "List B", selected: false},
            {key: "List C", text: "List C", selected: false},
        ]});
      }, 0);
    }

    let selectedItem = this.state.selectedItem || this.props.initialListName;

    return (
        <div>
        <Dropdown
          label='Controlled example:'
          selectedKey={ this.state.selectedItem }
          onChanged={ (item) => {
            this.props.onListSelectionChanged(item.text);
            this.setState({ ...this.state, selectedItem: item.key.toString() });
            }}
          options={this.state.options}
        />
        </div>
    );

  }
}
