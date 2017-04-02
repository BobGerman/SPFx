
// Interface
import { IMessageManager } from './IMessageManager';

// From JavaScript
var getGreeting = <() => string> require('./Messages1.js');

// All exports
import * as messages2 from './Messages2';

// Specific exports
import { IMessageFormatter, MessageFormatter, myMessage as msg } from './Messages3';

export class MessageManager implements IMessageManager {

    public GetMessage() : string {

        var result: string = "";

        result += `Greeting: ${getGreeting()}`;
        
        const mf: IMessageFormatter = new MessageFormatter();
        result += '<br />The magic 8 ball says: ' + messages2.get8BallMessage();
        result += '<br />Dice roll: ' + messages2.getDiceRoll();
        result += `<br />Shout about: ${mf.shout(msg)}`;
    
        return result;
    }
}