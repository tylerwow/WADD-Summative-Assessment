const scores = JSON.parse(localStorage.getItem("quizScores"));
const categories = ["Any Category", "General Knowledge", "Entertainment: Books", "Entertainment: Film", "Entertainment: Music",
    "Entertainment: Musicals and Theaters", "Entertainment: Television", "Entertainment: Video Games", "Entertainment: Board Games",
    "Science and Nature", "Science: Computers", "Science: Mathematics", "Mythology", "Sports", "Geography", "History", "Politics",
    "Art", "Celebrities", "Animals", "Vehicles", "Entertainment: Comics", "Science: Gadgets", "Entertainment: Japanese Anime and Manga",
    "Entertainment: Cartoon and Animations"
];

if (scores !== null) {
    document.getElementById("data").style.display = "flex";
    document.getElementById("missing-data").style.display ="none";

    const table = document.getElementById("scores");
    for (const score of scores) {
        const newRow = document.createElement("tr");

        const nameCol = document.createElement("td");
        nameCol.innerText = score.name;
        newRow.appendChild(nameCol);

        const categoryCol = document.createElement("td");
        if (score.category === "") {
            categoryCol.innerText = categories[0];
        }
        else {
            categoryCol.innerText = categories[score.category - 8];
        }
        newRow.appendChild(categoryCol);

        const difficultyCol = document.createElement("td");
        difficultyCol.innerText = score.difficulty[0].toUpperCase() + score.difficulty.slice(1);
        newRow.appendChild(difficultyCol);

        const scoreCol = document.createElement("td");
        scoreCol.innerText = score.score;
        newRow.appendChild(scoreCol);

        const outcome = document.createElement("td");

        newRow.appendChild(outcome);
        table.appendChild(newRow);
    }
}
else {
    document.getElementById("data").style.display = "none";
    document.getElementById("missing-data").style.display ="inline";
}