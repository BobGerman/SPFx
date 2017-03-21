export var myMessage: string = "My message";

export interface IMessageFormatter {
    shout: (string) => string;
    whisper: (string) => string;
}

export class MessageFormatter implements IMessageFormatter {

    shout(s: string):string {
        return s.toUpperCase() + "!";
    }

    whisper(s: string): string {
        return s.toLowerCase();
    }

}

// USAGE EXAMPLE:
//
// import { myMessage, IMessageFormatter, MessageFormatter } from './Messages';
//
// ...
// 
// const mf: IMessageFormatter = new MessageFormatter();
// var result = `Shout about ${mf.shout(myMessage)}`;

