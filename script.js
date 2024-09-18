'use strict';

//Selecting ELEMENTS
const score0El = document.querySelector('#score--0') //this is temp score the player 0
//specially to select an element via ID we can use:
const score1El = document.getElementById('score--1') //Noo Need of ID and this is bit faster than querySelector
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//active player's background
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');


score0El.textContent = 0; //although we enter the score as number javascript will convert it to string while displaying it on the page
score1El.textContent = 0;
diceEl.classList.add('hidden');


const scores = [0,0] //this array stores the total FINAL score of the both player and thus we name the players [player0 and player1]
let currentScore = 0 ; // we should not have this inside the function as everytime we call this the score would reset
let activePlayer = 0 ; //this shows us who is playing the game this will be 0 if 1st player is playing the game and if it is 1 then 2ndplayer will be playing the game
//as the 1st player starts the game it is given 0 intially

//to help us know is the game is actually been playen or not we assign a variable
//this would stop the buttons to be used even after winning the game
let playing = true; //intially ofc we r playing the game



//function to switchPlayer:
const switchPlayer = function(){
    //this function doesnt require any argument/parameters as code is exactly the same in the both places we tried to use
     document.getElementById(`current--${activePlayer}`).textContent = 0;
     currentScore=0;
     activePlayer=activePlayer===0?1:0;
     player0El.classList.toggle(`player--active`);
     player1El.classList.toggle(`player--active`);
}


// document.querySelector('.btn-roll').addEventListener('click',function) this is same the below line
btnRoll.addEventListener('click',function(){
    if(playing){ //playing is already an boolean
    // 1. Generating a randow dice roll
    const dice = Math.trunc(Math.random()*6) + 1; //we dont need a globally defined dice roll value as we need a new value everytime dice is rolled

    // 2. Display dice
    
    diceEl.classList.remove('hidden'); //we simply show the dice photo but not acc to the number scored
    
    //manipulating the dice photo acc to the random number and Display the desired photo:
    //to do this we simply change the src attribute as the src is the main area where HTML goes and takes the photo so we Manipulatee src of the img using DOM
    diceEl.src = `dice-${dice}.png`  //src--> source property which  is set to a string which is the name of the img displayed
    //as the name of the dice img are similar we use similar string to save the src property

    // 3. check if the number is 1,if true reset the score to 0 and switch to next person
    if(dice !== 1){
        // add dice to the current score
        //currentScore = currentScore + dice;
       currentScore +=dice;  //CHANGE LATER
       document.getElementById(`current--${activePlayer}`).textContent=currentScore;
       //also note that id name given is handy like current--0 and curren--1
       //this here helps selecting the player based on who is playing the game and adjust the score accordingly

       //instead of manipulating the curent score of player 0 we select the element dynamically as always player 1 doesnt play
       //current0El.textContent = currentScore

       //adding the current scores: ---> THIS HERE WAS MISTAKE DONE BY ME WE DONT SAVE THE FINAL SCORE UNTIL THE USER CLICK HOLD
       //scores[`${activePlayer}`] += currentScore;
    }else{
        // DICE VALUE === 1
        //reset and switch to next player
        //Before Switching between players we display the current score the player playing to be zero;
        //document.getElementById(`current--${activePlayer}`).textContent=0;

        //resetting the current scores:
        //currentScore=0;
        
        //changing the active player
        switchPlayer();
        //activePlayer = activePlayer === 0 ? 1 :0;
        //if the active player is 0 then change it to 1 else change it to 0 (we r using ternary operator)
        
       //giving and removing the background of the current class to CHANGE The BACKGROUND
       //player0El.classList.toggle('player--active');
       //toggle method in class list removes the class if it is not there and adds the class if it is NOT there ---> VERY USEFUL
       // player0El.classList.toggle('player--active');
    }
}
})


//when the user clicks HOLD:
btnHold.addEventListener('click',function(){
    if(playing){
    //1. Add current score to active player's final score;
    scores[`${activePlayer}`] = scores[`${activePlayer}`] + currentScore; //if the activeplayer is 0 then his score from the array will be used and will be added to the dice's number
    //manipulating the user's view of the final score:
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

    //2.Check if player's score is >= 100;
    //if so then they finish the game
    if(scores[activePlayer]>=100){
        playing = false //we stop playing
        diceEl.classList.add('hidden'); //removing the dice photo
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        //we should also remove the active player class as both these would collade
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    }else{
    //switch to the next player if they press hold
    //which is same as switching the player above so we store it in a function and call it TWICE following the DRY principle
    switchPlayer();
    
    // document.getElementById(`current--${activePlayer}`).textContent = 0;
    // currentScore=0;
    // activePlayer=activePlayer===0?1:0;
    // player0El.classList.toggle(`player--active`);
    // player1El.classList.toggle(`player--active`);
    }
  }
});

//resetting the game:
btnNew.addEventListener('click',function(){
    currentScore = 0;
    activePlayer=0;
    scores[0]=0;
    scores[1]=0


    score0El.textContent=0;
    score1El.textContent=0;
    current0El.textContent=0;
    current1El.textContent=0;
    diceEl.classList.add('hidden');
    player0El.classList.add(`player--active`);
    player1El.classList.remove(`player--active`);
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
})
