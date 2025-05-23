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

let category = sessionStorage.getItem("quizCategory");
let difficulty = sessionStorage.getItem("quizDifficulty");

const scoreOutput = document.getElementById("score");
const questionOutput = document.getElementById("question");
const answerBtn1 = document.getElementById("answer-btn-1");
const answerBtn2 = document.getElementById("answer-btn-2");
const answerBtn3 = document.getElementById("answer-btn-3");
const answerBtn4 = document.getElementById("answer-btn-4");

const heart1 = document.getElementById("heart-1");
const heart2 = document.getElementById("heart-2");
const heart3 = document.getElementById("heart-3");

const loadingMsg = document.getElementById("loading-msg");

function generateApiUrl(category, difficulty) {
    return apiUrl = "https://opentdb.com/api.php?amount=10&category=" + category + "&difficulty="+ difficulty + "&type=multiple";
}

function callApi() {
    document.getElementById("loading").style.display = "flex";
    document.getElementById("content").style.display = "none";

    fetch(generateApiUrl(category, difficulty))
        .then(function (result) {
            if (result.status == 429) {
                setTimeout(() => {
                    callApi();
                }, 5000)
            }
            else {
                return result.json();
            }
        })
        .then(function (data) {
            jsonQuestions = data
            refreshQuestion();

            document.getElementById("loading").style.display = "none";
            document.getElementById("content").style.display = "inline-block";
        })
        .catch(function (error) {
            loadingMsg.innerHTML = "This may take longer than expected...";
            console.log(error)
        });
}

function updateQuestion(data) {
    answers = [];

    question = data.results[questionNum -1].question;
    correctAnswer = data.results[questionNum -1].correct_answer;
    incorrectAnswer1 = data.results[questionNum -1].incorrect_answers[0];
    incorrectAnswer2 = data.results[questionNum -1].incorrect_answers[1];
    incorrectAnswer3 = data.results[questionNum -1].incorrect_answers[2];
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
    questionOutput.innerHTML = decodeHtml(question);
    answerBtn1.value = decodeHtml(answers[0]);
    answerBtn2.value = decodeHtml(answers[1]);
    answerBtn3.value = decodeHtml(answers[2]);
    answerBtn4.value = decodeHtml(answers[3]);

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
    if (button.value == correctAnswer) {
        console.log("correct");
        score += 1;
    }
    else {
        console.log("incorrect");
        lives -= 1;
    }

    if (lives !== 0) {
        questionNum += 1;
        refreshQuestion();
    }
    else {
        saveScore();
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
    })

    localStorage.setItem("quizScores", JSON.stringify(scoreLog));

    location.href = "scores.html";
}

callApi();

answerBtn1.addEventListener("click", () => checkAnswer(answerBtn1));
answerBtn2.addEventListener("click", () => checkAnswer(answerBtn2));
answerBtn3.addEventListener("click", () => checkAnswer(answerBtn3));
answerBtn4.addEventListener("click", () => checkAnswer(answerBtn4));