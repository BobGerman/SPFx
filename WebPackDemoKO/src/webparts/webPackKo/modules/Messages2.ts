export var get8BallMessage : () => string =
        () => {

    var messages: string[] = [
        "It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it",
        "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes",
        "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now",
        "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no",
        "Outlook is not so good", "Very doubtful"
    ];
    var r: number = 
        Math.floor(Math.random()*messages.length);
    
    return messages[r];
};

export var getPhilMessage: () => string =
         () => {

    var messages: string[] = [
        "Punxutawney Phil sees his shadow, 6 more weeks of winter",
        "Punxutawney Phil doesn't see his shadow, winter is over"
    ]

    var r: number =
        Math.floor(Math.random()*messages.length);
    
    return messages[r];
}

export var getDiceRoll: () => string =
    () => {

    return "You rolled a " + Math.floor(Math.random()*6) + 1;

}

// USAGE EXAMPLE:
//
// var getGreeting = <() => string> require('Messages1.js');
//
// ...
// 
// var result = getGreeting();