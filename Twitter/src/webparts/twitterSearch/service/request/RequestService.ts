import IRequest from '../../model/IRequest';
import IRequestListItem from './servicePayloads/IRequestListItem';
import { IRequestService, IRequestServiceProps } from './IRequestService';
import { sp } from '@pnp/sp';

export default class RequestService implements IRequestService {

    constructor(private serviceProps: IRequestServiceProps) { }

    public getRequestsForCurrentUser():
        Promise<IRequest[] | string> {

        return new Promise<IRequest[] | string>((resolve, reject) => {

            let result: IRequest[] = [];

            sp.web.lists.getByTitle(this.serviceProps.listName).items
                .select("Title", "Status", "TweetText","Modified", "RequestedbyId")
                .filter(`RequestedbyId eq ${this.serviceProps.currentUserId} `)
                .get()
                .then((items: IRequestListItem[]) => {
                    result = items.map((item: IRequestListItem): IRequest => {
                        return {
                            iconUrl: this.getIcon(item.Status),
                            title: item.Title,
                            detail: item.TweetText,
                            lastUpdate: new Date(item.Modified)
                        };
                    });
                    resolve(result);
                })
                .catch((message) => { reject(message); });

        });
    }

    private getIcon(status: string): string {

        let result: string = "#";

        switch (status.toLowerCase()) {
            case "requested": {
                result = <string> require('../../assets/icons8-wait-96.png');
                break;
            }
            case "approved": {
                result = <string> require('../../assets/icons8-ok-96.png');
                break;
            }
            case "denied": {
                result = <string> require('../../assets/icons8-close-window-96.png');
                break;
            }
            case "sent": {
                result = <string> require('../../assets/icons8-ok-96.png');
                break;
            }
            default: {  // something's wrong
                result = <string> require('../../assets/icons8-close-window-96.png');
                break;
            }
        }
        return result;
    }
}