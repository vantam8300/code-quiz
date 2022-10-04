var timerEl = document.getElementById("timer");

var startBtn = document.getElementById("start-btn");

var startDiv = document.querySelector(".start");

var quizDiv = document.querySelector(".quiz");

var viewHighScoresEl = document.querySelector("#highScoresView");

var highScoreDiv = document.querySelector(".high-scores");

var highScoresList = document.querySelector(".high-scores-list");

var goBackBtn = document.querySelector("#goBackBtn");

var clearBtn = document.querySelector("#clearBtn");

var submitBtn = document.querySelector("#submit");

var questions = [
    {question:"Commonly used data types DO NOT include:", answers:["Strings","Booleans","Alerts","Numbers"], correctAnwer: 3},
    {question:"Arrays in JavaScript can be used to store:", answers:["Numbers and Strings","Other Arrays","Booleans","All of the Above"], correctAnwer: 4},
    {question:"String values must be enclosed within ____ when being assigned to variables", answers:["Commas","Curly Brackets","Quotes","Parenthesis"], correctAnwer: 3},
    {question:"The condition of an if/else statement is enclosed with:", answers:["Quotes","Curly Brackets","Parenthesis","Square Brackets"], correctAnwer: 3}
];

var questionIndex = 0; //index of current question

function startTime() {
    // start counting down
    var timeLeft = 75;
    var timeInterval = setInterval(function() {
        if (timeLeft >= 1) {
            timeLeft--;
            timerEl.textContent = timeLeft;
            
         } else {
            // end of the quiz
            clearInterval(timeInterval);
            
        }
    },1000);

}

function startQuiz() {
    //start counting down
    startTime();

    renderQuiz();
}

function renderQuiz() {
    //display quiz and hide starting code
    if(quizDiv.dataset.state == "hidden"){
        
        startDiv.setAttribute("style", "display: none;")
        quizDiv.setAttribute("style","display: block;")

        // disable view high scores link during the quiz
        viewHighScoresEl.setAttribute("style","pointer-events: none;")
    }

    // adding question to the page
    var currentQuestion = questions[questionIndex];

    var question = document.createElement("h2");

    question.textContent = currentQuestion.question;

    quizDiv.appendChild(question);

    // adding answers to the page 
    for (var i=0; i<currentQuestion.answers.length; i++) {
        var answer = document.createElement("input")
        answer.setAttribute("type", "button");
        answer.setAttribute("class", "btn");
        answer.value = currentQuestion.answers[i];
        quizDiv.appendChild(answer);
    }

    // display whether user anwser correctly or not
    var result = document.createElement("div");
    result.setAttribute("class", "correct-answer");
    
    if (true) {
        result.textContent = "Correct!";
    } else {
        result.textContent = "Wrong!";
    }
    quizDiv.appendChild(result);

}

function checkAnswer() {

}

// View High Scores link is clicked
viewHighScoresEl.addEventListener("click", function() {
    startDiv.setAttribute("style", "display: none;")
    highScoreDiv.setAttribute("style","display: block;");
});


// Go Back button is clicked
goBackBtn.addEventListener("click", function() {
    startDiv.setAttribute("style", "display: block;")
    highScoreDiv.setAttribute("style","display: none;");
});

// Clear button is click
clearBtn.addEventListener("click", function() {
    highScoresList.textContent = "";
});

// Submit button is clicked
submitBtn.addEventListener("click", function() {
    var initial = document.querySelector("#init").value;
    localStorage.setItem("initials", initial);

});

// start button is clicked
startBtn.addEventListener("click", startQuiz);
