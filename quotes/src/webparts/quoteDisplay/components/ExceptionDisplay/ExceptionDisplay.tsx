import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

import * as React from 'react';
import { IExceptionDisplayProps } from './IExceptionDisplayProps';
import styles from '../Quotes.module.scss';

export default class ExceptionDisplay extends React.Component<IExceptionDisplayProps, void> {

  public render(): React.ReactElement<IExceptionDisplayProps> {

    return (
        <div className={styles.exceptions}>
            <MessageBar messageBarType={ MessageBarType.error }>
                Error: {this.props.message} ({this.props.statusText})
                <Link className={styles.errorLink} onClick={this.handleClick.bind(this)}>
                    Edit web part
                </Link>

            </MessageBar>
        </div>
    );
  }

  private handleClick() {
      this.props.onEditWebPart();
  }

}
