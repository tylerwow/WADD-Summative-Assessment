const scores = JSON.parse(localStorage.getItem("quizScores"));

// Array to decipher stored category
const categories = ["Any Category", "General Knowledge", "Entertainment: Books", "Entertainment: Film", "Entertainment: Music",
    "Entertainment: Musicals and Theaters", "Entertainment: Television", "Entertainment: Video Games", "Entertainment: Board Games",
    "Science and Nature", "Science: Computers", "Science: Mathematics", "Mythology", "Sports", "Geography", "History", "Politics",
    "Art", "Celebrities", "Animals", "Vehicles", "Entertainment: Comics", "Science: Gadgets", "Entertainment: Japanese Anime and Manga",
    "Entertainment: Cartoon and Animations"
];

// HTML elements
const resetBtn = document.getElementById("reset-btn");
const finalResetBtn = document.getElementById("final-reset-btn");
const backBtn = document.getElementById("back-btn");

document.getElementById("confirmation").style.display ="none";

/**
 * Displays table by pulling result from local storage
 */
function displayScores() {
    if (scores !== null) {
        document.getElementById("data").style.display = "flex";
        document.getElementById("missing-data").style.display ="none";

        const table = document.getElementById("scores");
        for (const score of scores) {
            const newRow = document.createElement("tr");

            // Name column
            const nameCol = document.createElement("td");
            nameCol.innerText = score.name;
            newRow.appendChild(nameCol);

            // Category column
            const categoryCol = document.createElement("td");
            if (score.category === "") {
                categoryCol.innerText = categories[0];
            }
            else {
                categoryCol.innerText = categories[score.category - 8];
            }
            newRow.appendChild(categoryCol);

            // Difficulty column
            const difficultyCol = document.createElement("td");
            difficultyCol.innerText = score.difficulty[0].toUpperCase() + score.difficulty.slice(1);
            newRow.appendChild(difficultyCol);

            // Score column
            const scoreCol = document.createElement("td");
            scoreCol.innerText = score.score;
            newRow.appendChild(scoreCol);

            table.appendChild(newRow);
        }
    }
    else {
        document.getElementById("data").style.display = "none";
        document.getElementById("missing-data").style.display ="inline";
    }
}

/**
 * Shows confirmation buttons
 */
function viewConfirmation() {
    document.getElementById("data").style.display ="none";
    document.getElementById("confirmation").style.display ="flex";
}

/**
 * Shows table
 */
function viewScores() {
    document.getElementById("data").style.display ="flex";
    document.getElementById("confirmation").style.display ="none";
}

/**
 * Clears results in local storage
 */
function resetScores() {
    localStorage.removeItem("quizScores");
    location.href = "scores.html";
}

displayScores();

// Event listeners
resetBtn.addEventListener("click", viewConfirmation);
backBtn.addEventListener("click", viewScores);
finalResetBtn.addEventListener("click", resetScores);