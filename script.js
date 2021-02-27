var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;


// Click on start/reset
document.getElementById('startreset').onclick = function() {
    if(playing == true) {  // if we are playing
        location.reload(); // reload page
    }
    else
    {
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;    // set score to 0

        document.getElementById('timeremaining').style.display = "block";   // show timeremaining

        timeremaining = 60;
        document.getElementById('timeremainingvalue').innerHTML = timeremaining;    // set timeremaining to 60

        document.getElementById('gameOver').style.display = 'none';  // hide game over box when game is over
        document.getElementById('startreset').innerHTML = 'Reset Game'; // change from Start Game to Reset Game

        startCountDown();   // start countdown
        generateQA();       // generate new Q&A
    }
}

// start counter
function startCountDown() 
{
    action = setInterval(function() {
        timeremaining-= 1;
        document.getElementById('timeremainingvalue').innerHTML = timeremaining;

        if(timeremaining == 0) {
            clearInterval(action);

            var gameOver = document.getElementById('gameOver');
            gameOver.style.display = 'block';
            gameOver.innerHTML = "<p>Game over</p><p>Your score is "+score+"</p>"; // show final score

            document.getElementById('timeremaining').style.display = 'none';    // hide time remaining

            document.getElementById('correct').style.display = 'block';
            document.getElementById('wrong').style.display = 'block';

            playing = false;
            document.getElementById('startreset').innerHTML = 'Start Game'; // change from Reset Game to Start Game
        }

    }, 1000)
}


function generateQA()
{                                             // * 9 generate number between 0-9
    var x = 1+Math.round(Math.random() * 9); // generate number between 1-10
    var y = 1+Math.round(Math.random() * 9);

    correctAnswer = x * y;

    document.getElementById('question').innerHTML = x + "x" + y;    // display at question 

    var correctPosition = 1 + Math.round(3 * Math.random()); // number between 1-4

    document.getElementById('box'+correctPosition).innerHTML = correctAnswer;
    
    var answers = [correctAnswer];

    for(i=1; i<5; i++)
    {
        if(i != correctPosition)
        {
            var wrongAnswer;
            do{
                wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));
            }while(answers.indexOf(wrongAnswer)>-1)     // if >-1 , wrongAnswer is in answers array

            document.getElementById('box'+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}


for(i=1; i<5; i++)
{
    document.getElementById('box'+i).onclick = function()
    {
        // check if we are playing
        if(playing == true)
        {
            if(this.innerHTML == correctAnswer)
            {
                score++;
                document.getElementById('scorevalue').innerHTML = score;

                document.getElementById('wrong').style.display = 'none';
                document.getElementById('correct').style.display = 'block';

                setTimeout(() => {
                    document.getElementById('correct').style.display = 'none';
                }, 1000);

                generateQA();
            }
            else
            {
                document.getElementById('wrong').style.display = 'block';
                document.getElementById('correct').style.display = 'none';

                setTimeout(()=> {
                    document.getElementById('wrong').style.display = 'none';
                }, 1000)
            }
        }
    }
}