let choices = [
    {name: 'rock', beats: 'scissors'},
    {name: 'scissors', beats: 'paper'},
    {name: 'paper', beats: 'rock'},
]

let gameState;
let maxScore;

let computerScore;
let playerScore;

let playerChoice;
let computerChoice;

let gameButton = document.querySelector("#new-game");
gameButton.addEventListener('click', () => {
    gameSetup(1);
})

let buttonContainer = document.querySelector(".buttons");
let playerInput = Array.from(document.querySelectorAll(".player-input"));
playerInput.forEach(button => {
    button.addEventListener('click', pickChoice);
});
let infoScreen = document.querySelector("#info");
let scoreboard = document.querySelector(".scoreboard")
let infoPlayerScore = document.querySelector("#player-score");
let infoComputerScore = document.querySelector("#computer-score");
let nextButton = document.querySelector("#next");
nextButton.addEventListener('click', updateGame);

function updateGame(){
    switch(gameState){
        case "roundSetup":
            nextButton.classList.remove("disabled");
            if(playerChoice != undefined){
                gameState = "roundPlay"
                updateGame();
                break;
            }
            buttonContainer.classList.remove("disabled");
            infoScreen.innerHTML = "Choose your attack:"
            break;
        case "roundPlay":
            scoreboard.classList.remove("disabled");
            buttonContainer.classList.add("disabled");
            computerChoice = getComputerChoice();
            let result = playRound(computerChoice, playerChoice);
            let announcement;
            if(result === 'draw') {
                announcement = 'Draw!';
            }else if(result === 'computer') {
                computerScore++;
                announcement = 'Computer wins the round! ' + computerChoice.name +' beats ' + playerChoice.name + '. Score: Player: '+ playerScore + ' Computer: ' + computerScore;
            }else {
                playerScore++;
                announcement = 'You win the round! '+playerChoice.name+' beats '+computerChoice.name+'.' + '. Score: Player: '+ playerScore + ' Computer: ' + computerScore;
            }

            infoScreen.innerHTML = "Your choice: "+playerChoice.name+"<br> Computer's choice: "+computerChoice.name+"<br>"+announcement;

            playerChoice = null;

            if(computerScore === maxScore || playerScore === maxScore){
                gameState = "gameEnd";
            }else{
                gameState = "roundSetup";
            }

            break;
        case "gameEnd":
            if(computerScore === maxScore){
                infoScreen.innerHTML = 'Computer wins ' + computerScore +'-'+ playerScore;
            } else {
                infoScreen.innerHTML = 'Player wins ' + playerScore +'-'+ computerScore;
            }
            buttonContainer.classList.add("disabled");
            nextButton.classList.add("disabled");
    }
}

function pickChoice(e){
    playerChoice = getChoice(e.target.getAttribute("data-selection"));
    infoScreen.innerHTML = "Option selected = " + playerChoice.name;
}

function getChoice(input){
    //get string, return choice object or fail
    for(choice of choices) {
        if(input === choice.name) return choice;
    };

    return false;
}

function playRound(computerChoice,playerChoice){
    //If draw, return
    if(computerChoice === playerChoice) return 'draw'
    //If cpu wins, return
    if(computerChoice.beats === playerChoice.name) return 'computer'
    //return
    return 'player'
}

function gameSetup(maxScoreSetup){
    computerScore = 0;
    playerScore = 0;
    maxScore = maxScoreSetup;
    playerChoice = null;
    gameState = "roundSetup";
    infoScreen.innerHTML = "";
    updateGame();
}

function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)]
}