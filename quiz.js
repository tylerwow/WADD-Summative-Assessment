let jsonQuestions;
let question;
let correctAnswer;
let incorrectAnswer1;
let incorrectAnswer2;
let incorrectAnswer3;
let answers = [];

let questionNum = 1;
let score = 0;

const scoreOutput = document.getElementById("score");
const questionOutput = document.getElementById("question");
const answerBtn1 = document.getElementById("answerBtn1");
const answerBtn2 = document.getElementById("answerBtn2");
const answerBtn3 = document.getElementById("answerBtn3");
const answerBtn4 = document.getElementById("answerBtn4");

function generateApiUrl(category, difficulty) {
    return apiUrl = "https://opentdb.com/api.php?amount=10&category=" + category + "&difficulty="+ difficulty + "&type=multiple";
}

function callApi() {
    fetch(generateApiUrl(sessionStorage.getItem("quizCategory"), sessionStorage.getItem("quizDifficulty")))
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            jsonQuestions = data;
            refreshQuestion();
        })
        .catch(function (error) {
            console.log("operation failed:", error)
        })
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

function updateOutput() {
    scoreOutput.innerHTML = score;
    questionOutput.innerHTML = question;
    answerBtn1.value = answers[0];
    answerBtn2.value = answers[1];
    answerBtn3.value = answers[2];
    answerBtn4.value = answers[3];
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
    }

    questionNum += 1;
    refreshQuestion();
}

callApi();

answerBtn1.addEventListener("click", () => checkAnswer(answerBtn1));
answerBtn2.addEventListener("click", () => checkAnswer(answerBtn2));
answerBtn3.addEventListener("click", () => checkAnswer(answerBtn3));
answerBtn4.addEventListener("click", () => checkAnswer(answerBtn4));