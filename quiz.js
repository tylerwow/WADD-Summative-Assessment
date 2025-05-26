let jsonQuestions;
let question;
let correctAnswer;
let incorrectAnswer1;
let incorrectAnswer2;
let incorrectAnswer3;
let answers = [];

let questionNum = 1;
let score = 0;
let lives = 3;

let hasAnswered = false;

let category = sessionStorage.getItem("quizCategory");
let difficulty = sessionStorage.getItem("quizDifficulty");

const scoreOutput = document.getElementById("score");
const questionOutput = document.getElementById("question");
const answerBtn1 = document.getElementById("answer-btn-1");
const answerBtn2 = document.getElementById("answer-btn-2");
const answerBtn3 = document.getElementById("answer-btn-3");
const answerBtn4 = document.getElementById("answer-btn-4");

const retryBtn = document.getElementById("retry-btn");
const nextBtn = document.getElementById("next-btn");

const finalScoreOutput = document.getElementById("final-score")

const heart1 = document.getElementById("heart-1");
const heart2 = document.getElementById("heart-2");
const heart3 = document.getElementById("heart-3");

const loadingMsg = document.getElementById("loading-msg");

document.getElementById("end").style.display = "none";

function generateApiUrl(category, difficulty) {
    return apiUrl = "https://opentdb.com/api.php?amount=10&category=" + category + "&difficulty="+ difficulty + "&type=multiple";
}

function callApi() {
    document.getElementById("loading").style.display = "flex";
    document.getElementById("content").style.display = "none";

    fetch(generateApiUrl(category, difficulty))
        .then(function (result) {
            if (result.status === 200) {
                return result.json();
            }
            else if (result.status === 429) {
                setTimeout(() => {
                    callApi();
                }, 5000);
            }
            else {
                getBackupData();
            }
        })
        .then(function (data) {
            jsonQuestions = data;
            refreshQuestion();

            document.getElementById("loading").style.display = "none";
            document.getElementById("content").style.display = "inline-block";
        })
        .catch(function (error) {
            loadingMsg.innerHTML = "This may take longer than expected...";
            console.log(error);
        });
}

function getBackupData() {
    document.getElementById("loading").style.display = "flex";
    document.getElementById("content").style.display = "none";

    fetch("backup.json")
        .then(function(result) {
            return result.json()
        })
        .then(function(data) {
            jsonQuestions = data;
            refreshQuestion();

            document.getElementById("loading").style.display = "none";
            document.getElementById("content").style.display = "inline-block";
        })
}

function updateQuestion(data) {
    answers = [];

    question = decodeHtml(data.results[questionNum -1].question);
    correctAnswer = decodeHtml(data.results[questionNum -1].correct_answer);
    incorrectAnswer1 = decodeHtml(data.results[questionNum -1].incorrect_answers[0]);
    incorrectAnswer2 = decodeHtml(data.results[questionNum -1].incorrect_answers[1]);
    incorrectAnswer3 = decodeHtml(data.results[questionNum -1].incorrect_answers[2]);
    answers.push(correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3);
}

function shuffleAnswers() {
    /*
    This code is based upon an example from a stack overflow answer
    Location: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    Accessed: 22/05/2025
    */
    let currentIndex = answers.length;
    console.log(answers);

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [answers[currentIndex], answers[randomIndex]] = [answers[randomIndex], answers[currentIndex]]
    }
    
}

/*
This function is based upon an example from a stack overflow answer
Author: Rob W
Location: https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it?lq=1
Accessed: 23/05/2025
*/
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function updateOutput() {
    scoreOutput.innerHTML = score;
    questionOutput.innerHTML = question;
    answerBtn1.value = answers[0];
    answerBtn2.value = answers[1];
    answerBtn3.value = answers[2];
    answerBtn4.value = answers[3];

    if (lives === 2) {
        heart3.style.visibility = "hidden";
    }  
    if (lives === 1 ) {
        heart2.style.visibility = "hidden";
    }
    if (lives === 0) {
        heart1.style.visibility = "hidden";
    }
}

function refreshQuestion() {
    if (questionNum > 10) {
        questionNum = 1;
        callApi();
    }
    else {
        updateQuestion(jsonQuestions);
        shuffleAnswers();
        updateOutput();
    }
}

function checkAnswer(button) {

    if (!hasAnswered) {
        hasAnswered = true;

        if (button.value == correctAnswer) {
            score += 1;
            button.style.backgroundColor = "rgb(8, 116, 0)";
        }
        else {
            button.style.backgroundColor = "rgb(187, 0, 0)";
            console.log("incorrect");
            lives -= 1;

            if (answerBtn1.value == correctAnswer) {
                answerBtn1.style.backgroundColor = "rgb(8, 116, 0)";
            }
            else if (answerBtn2.value == correctAnswer) {
                answerBtn2.style.backgroundColor = "rgb(8, 116, 0)";
            }
            else if (answerBtn3.value == correctAnswer) {
                answerBtn3.style.backgroundColor = "rgb(8, 116, 0)";
            }
            else if (answerBtn4.value == correctAnswer) {
                answerBtn4.style.backgroundColor = "rgb(8, 116, 0)";
            }

            if (lives === 2) {
                heart3.style.animation = "breakHeart 2.6s";

                setTimeout(() => {
                    heart3.className = "fa-solid fa-heart-crack quiz-heart";
                }, 1000);
            }  
            if (lives === 1 ) {
                heart2.style.animation = "breakHeart 2.6s";

                setTimeout(() => {
                    heart2.className = "fa-solid fa-heart-crack quiz-heart";
                }, 1000);
            }
            if (lives === 0) {
                heart1.style.animation = "breakHeart 2.6s";

                setTimeout(() => {
                    heart1.className = "fa-solid fa-heart-crack quiz-heart";
                }, 1000);
            }
        }

        setTimeout(() => {
            answerBtn1.style.backgroundColor = "";
            answerBtn2.style.backgroundColor = "";
            answerBtn3.style.backgroundColor = "";
            answerBtn4.style.backgroundColor = "";

            if (lives !== 0) {
                questionNum += 1;
                refreshQuestion();
            }
            else {
                saveScore();
            }

            hasAnswered = false;
        }, 2500);
    }
}

function saveScore() {
    let scoreLog = [];

    if (localStorage.getItem("quizScores") !== null) {
        scoreLog = JSON.parse(localStorage.getItem("quizScores"));
    }
    scoreLog.push({
        name: sessionStorage.getItem("quizName"),
        category: category,
        difficulty: difficulty,
        score: score
    });

    localStorage.setItem("quizScores", JSON.stringify(scoreLog));

    finalScoreOutput.innerHTML = score;

    document.getElementById("end").style.display = "inline-block";
    document.getElementById("content").style.display = "none";
}

function refreshPage() {
    location.href = "quiz.html";
}

function nextPage() {
    location.href = "scores.html";
}

callApi();
//getBackupData();

answerBtn1.addEventListener("click", () => checkAnswer(answerBtn1));
answerBtn2.addEventListener("click", () => checkAnswer(answerBtn2));
answerBtn3.addEventListener("click", () => checkAnswer(answerBtn3));
answerBtn4.addEventListener("click", () => checkAnswer(answerBtn4));

retryBtn.addEventListener("click", refreshPage);

nextBtn.addEventListener("click", nextPage);