import { IMessageManager } from './IMessageManager';

import { myMessage, IMessageFormatter, MessageFormatter } from './Messages1';

export class MessageManager implements IMessageManager {

    public GetMessage() : string {

        const mf: IMessageFormatter = new MessageFormatter();
        return `Shout about ${mf.shout(myMessage)}`;
    
    }
}