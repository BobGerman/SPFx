import { IMessageManager } from './IMessageManager';

var getGreeting = <() => string> require('./Messages1.js');
var randomMessage = <any> require ('./Messages2.js');
import { IMessageFormatter, MessageFormatter, myMessage } from './Messages3';

export class MessageManager implements IMessageManager {

    public GetMessage() : string {

        var result: string = "";

        result += getGreeting();
        
        const mf: IMessageFormatter = new MessageFormatter();
        result += '<br />' + randomMessage.get8BallMessage();
        result += `<br />Shout about ${mf.shout(myMessage)}`;
    
        return result;
    }
}