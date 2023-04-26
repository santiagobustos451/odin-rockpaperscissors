let choices = [
    {name: 'rock', beats: 'scissors'},
    {name: 'scissors', beats: 'paper'},
    {name: 'paper', beats: 'rock'},
]

document.addEventListener('DOMContentLoaded', game(5));

function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)]
}

function playRound(computerChoice,playerChoice){
        //Compares values and returns results, and describes (You win/lose, choiceA beats choiceB!)

        //Recieves choice objects

    //If draw, return
    if(computerChoice === playerChoice) return 'draw'
    //If cpu wins, return
    if(computerChoice.beats === playerChoice.name) return 'computer'
    //return
    return 'player'
}

function checkChoice(input){
    //get string, return choice object or fail
    for(choice of choices) {
        if(input === choice.name) return choice;
    };

    return false;
}

function game(maxScore){
        //Prompt the player for answers, play five rounds and give results

    let computerScore = 0;
    let playerScore = 0;

    //generate computer choice
    //prompt the player. Validate the choice, if fail prompt again
    //play round
    //store round score
    //if no one reaches 3 points, play new round
    while(computerScore < maxScore && playerScore < maxScore){
        let playerChoice;
        let computerChoice = getComputerChoice();
        while(!playerChoice){
            playerChoice = checkChoice(prompt('What do you choose?').toLowerCase());
            if(!playerChoice){
                alert('Choice not recognized. Make sure you spell your choice correctly.')
            }
        }
        let result = playRound(computerChoice, playerChoice);
        if(result === 'draw') {
            alert('Draw!');
        }else if(result === 'computer') {
            computerScore++;
            alert('Computer wins the round! ' + computerChoice.name +' beats ' + playerChoice.name + '. Score: Player: '+ playerScore + ' Computer: ' + computerScore);
        }else {
            playerScore++;
            alert('You win the round! '+playerChoice.name+' beats '+computerChoice.name+'.' + '. Score: Player: '+ playerScore + ' Computer: ' + computerScore);
        }
    }
    
    //give results
    if(computerScore === maxScore){
        alert('Computer wins ' + computerScore +'-'+ playerScore)
    } else {
        alert('Player wins ' + playerScore +'-'+ computerScore)
    }

    if(confirm('Play again?')){
        game();
    }
}