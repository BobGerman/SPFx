export default class message {

    private static factor1: number = 6;
    private static factor2: number = 7;

    public static getAnswer(): string {
        return `The ultimate answer to life,
                the universe, and everything
                is ${this.factor1*this.factor2}`;
    }
}

// USAGE EXAMPLE:
//
// import deepThought from './Messages4';
//
// ...
// 
// var ultimateAnswer =deepThought.getAnswer();

