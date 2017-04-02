function get8BallMessage() {

    var messages = [
        "It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it",
        "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes",
        "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now",
        "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no",
        "Outlook is not so good", "Very doubtful"
    ];
    var r = Math.floor(Math.random()*messages.length);
    
    return messages[r];
};

function getPhilMessage() {

    var messages = [
        "Punxutawney Phil sees his shadow, 6 more weeks of winter",
        "Punxutawney Phil doesn't see his shadow, winter is over"
    ]

    var r = Math.floor(Math.random()*messages.length);
    
    return messages[r];
}

function getDiceRoll() {

    return "You rolled a " + Math.floor(Math.random()*6) + 1;

}

module.exports = {
    get8BallMessage: get8BallMessage,
    getPhilMessage: getPhilMessage,
    getDiceRoll: getDiceRoll
};

// USAGE EXAMPLE:
//
// var getGreeting = <() => string> require('Messages1.js');
//
// ...
// 
// var result = getGreeting();