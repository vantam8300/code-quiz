var timerEl = document.getElementById("timer");

var startBtn = document.getElementById("start-btn");

var startDiv = document.querySelector(".start");

var quizDiv = document.querySelector(".quiz");

var highScoreDiv = document.querySelector(".high-scores");

var initalDiv = document.querySelector(".initial");

var viewHighScoresEl = document.querySelector("#highScoresView");

var highScoresList = document.querySelector(".high-scores-list");

var goBackBtn = document.querySelector("#goBackBtn");

var clearBtn = document.querySelector("#clearBtn");

var submitBtn = document.querySelector("#submit");

var scoreEl = document.querySelector("#score");

var questions = [
    { question: "Commonly used data types DO NOT include:", answers: ["Strings", "Booleans", "Alerts", "Numbers"], correctAnwer: "Alerts" },
    { question: "Arrays in JavaScript can be used to store:", answers: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"], correctAnwer: "All of the Above" },
    { question: "String values must be enclosed within ____ when being assigned to variables", answers: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"], correctAnwer: "Quotes" },
    { question: "The condition of an if/else statement is enclosed with:", answers: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"], correctAnwer: "Parenthesis" }
];

let questionIndex = 0; //index of current question
let timeInterval
let timeLeft = 75;
function startTime() {
    // start counting down
    
    timeInterval = setInterval(function () {
        if (timeLeft >= 1) {
            timeLeft--;
            timerEl.textContent = timeLeft;

        } else {
            // when time is over. End of the quiz
            endOfQuiz()

        }
    }, 1000);

}

function startQuiz() {
    // reset time bank and question Index if user want to do the quiz again
    questionIndex = 0;
    timeLeft = 75;

    //start counting down
    startTime();

    renderQuiz();
}

function renderQuiz() {
    //display quiz and hide starting code
    if (quizDiv.dataset.state == "hidden") {

        startDiv.setAttribute("style", "display: none;")
        quizDiv.setAttribute("style", "display: block;")

        // disable view high scores link during the quiz
        viewHighScoresEl.setAttribute("style", "pointer-events: none;")
    }

    // adding question to the page
    var currentQuestion = questions[questionIndex];

    var question = document.createElement("h2");

    question.textContent = currentQuestion.question;

    quizDiv.appendChild(question);

    // adding answers to the page 
    for (var i = 0; i < currentQuestion.answers.length; i++) {
        var answer = document.createElement("input")
        answer.setAttribute("type", "button");
        answer.setAttribute("class", "btn");
        answer.value = currentQuestion.answers[i];
        quizDiv.appendChild(answer);
    }

}

function endOfQuiz(){
    // display the initial form and hide the quiz when the quiz ended
    quizDiv.setAttribute("style", "display: none;")
    initalDiv.setAttribute("style", "display: block;")

    clearInterval(timeInterval); // stop the timer

    scoreEl.textContent = timeLeft; // display the score

    // enable "view High Score" link
    viewHighScoresEl.setAttribute("style", "pointer-events: auto;")
}

quizDiv.addEventListener("click", function (event) {

    var element = event.target;
    if (element.matches("input") === true) {
        // remove previous question when user selected answer
        quizDiv.innerHTML = "";
        var currentQuestion = questions[questionIndex];
        // render next question
        questionIndex++;

        if (questionIndex == questions.length) { //reach the last question
            endOfQuiz()

        } else {
            // there still be some questions in list
            renderQuiz()

            // adding correct answer of the previous question
            var result = document.createElement("div");
            result.setAttribute("class", "correct-answer");
            if (element.value === currentQuestion.correctAnwer) {
                result.textContent = "Correct!";
            } else {
                timeLeft -= 10; // subtract 10 second if user gets wrong answer
                result.textContent = "Wrong!"
            }
            quizDiv.appendChild(result);
        }

    }
});

// View High Scores link is clicked
viewHighScoresEl.addEventListener("click", function () {
    startDiv.setAttribute("style", "display: none;");
    initalDiv.setAttribute("style", "display: none;");
    highScoreDiv.setAttribute("style", "display: block;");
});


// Go Back button is clicked
goBackBtn.addEventListener("click", function () {
    startDiv.setAttribute("style", "display: block;")
    highScoreDiv.setAttribute("style", "display: none;");
});

// Clear button is click
clearBtn.addEventListener("click", function () {
    highScoresList.textContent = "";
});

// Submit button is clicked
submitBtn.addEventListener("click", function () {
    var initial = document.querySelector("#init").value;
    localStorage.setItem("initials", initial);

});

// start button is clicked
startBtn.addEventListener("click", startQuiz);
