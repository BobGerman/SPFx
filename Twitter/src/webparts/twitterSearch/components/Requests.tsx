import * as React from 'react';
import styles from './TwitterSearch.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

import IRequest from '../model/IRequest';

export interface IRequestsProps {
    requests: IRequest[];
}

export class Requests extends React.Component<IRequestsProps, {}> {

    public render(): React.ReactElement<IRequestsProps> {

        let count = 0;

        if (this.props.requests.length > 0) {

            return (
                <div>
                    {this.props.requests.map(p => (

                        <div>
                            {(count++ !== 0) ?
                                <div className={styles.row}>
                                    <div className={styles.fullColumn}>
                                        <hr />
                                    </div>
                                </div>
                                :
                                <div className={styles.firstFullColumn}></div>
                            }
                            <div className={styles.row}>
                                <div className={styles.imageColumn}>
                                    <img className={styles.senderImage} src={escape(p.iconUrl)}></img>
                                </div>
                                <div className={styles.textColumn}>
                                    <span className={styles.senderName}>{escape(p.title)}</span>
                                    <span className={styles.tweetDate}>&nbsp;({escape(
                                    `${p.lastUpdate.toLocaleDateString()} ${p.lastUpdate.toLocaleTimeString()}`)})</span>
                                    <br />
                                    <span className={styles.tweetText}>{p.detail}</span>
                                </div>

                            </div>
                        </div>
                    ))}
                    <div className={styles.row}>
                        <div className={styles.lastFullColumn}></div>
                    </div>
                </div>
            );

        } else {

            return <div></div>;
            
        }

    }
}
