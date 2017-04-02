
// Interface
import { IMessageManager } from './IMessageManager';

// From JavaScript
var getGreeting = <() => string> require('./Messages1.js');

// All exports
import * as randomMessages from './Messages2';

// Specific exports
import { IMessageFormatter, MessageFormatter, myMessage as msg } from './Messages3';

// Import the default
import deepThought from './Messages4';

export class MessageManager implements IMessageManager {

    public GetMessage() : string {

        var result: string = "";

        result += `Greeting: ${getGreeting()}`;
        
        const mf: IMessageFormatter = new MessageFormatter();
        result += '<br />The magic 8 ball says: ' + randomMessages.get8BallMessage();
        result += '<br />Dice roll: ' + randomMessages.getDiceRoll();
        result += `<br />Shout about: ${mf.shout(msg)}`;
        result += `<br />${deepThought.getAnswer()}`;
    
        return result;
    }
}