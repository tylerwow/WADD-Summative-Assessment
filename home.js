const scores = JSON.parse(localStorage.getItem("quizScores"));
const highScoreOutput = document.getElementById("high-score");

/**
 * Displays high score on the main menu
 */
function displayHighScore() {
    let highScore = 0;

    if (scores !== null) {
        for (const score of scores) {
            if (highScore < score.score) {
                highScore = score.score;
            }
        }

        highScoreOutput.innerHTML = "High Score: " + highScore;
    }
    else {
        highScoreOutput.innerHTML = "Get a high score!";
    }
}

displayHighScore();