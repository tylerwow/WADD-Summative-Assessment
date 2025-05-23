function checkName() {
    if (document.getElementById("form-name").value == "") {
        document.getElementById("form-name-error").innerHTML = "You must enter your name.";
        return false;
    }
    else {
        return true;
    }
}

function saveFormData() {
    if (checkName()) {
        let formName = document.getElementById("form-name").value;
        let formCategory = document.getElementById("form-category").value;
        let formDifficulty;

        for (let i of document.getElementsByName("difficulty")) {
            if (i.checked) {
                formDifficulty = i.value;
                break;
            }
        }

        sessionStorage.setItem("quizName", formName);
        sessionStorage.setItem("quizCategory", formCategory);
        sessionStorage.setItem("quizDifficulty", formDifficulty);

        location.href = "quiz.html";
    }
}

const formSubmitBtn = document.getElementById("form-submit-btn");
formSubmitBtn.addEventListener("click", saveFormData);