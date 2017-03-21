import { IMessageManager } from './IMessageManager';

export class MessageManager implements IMessageManager {

    public GetMessage() : string {
        return "Howdy";
    }

}