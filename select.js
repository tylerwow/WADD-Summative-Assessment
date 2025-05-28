const formSubmitBtn = document.getElementById("form-submit-btn");

/**
 * Checks if user has entered their name
 * @returns {boolean} False if they have not entered their name, True otherwise
 */
function checkName() {
    if (document.getElementById("form-name").value == "") {
        document.getElementById("form-name-error").innerHTML = "You must enter your name.";
        return false;
    }
    else {
        return true;
    }
}

/**
 * Saves inputted form data to session storage
 */
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

// Event Listeners
formSubmitBtn.addEventListener("click", saveFormData);

/*
This event listener is based on the example code
Location: https://www.shecodes.io/athena/8493-how-to-submit-a-form-by-pressing-enter-in-javascript
Accessed: 24/05/2025
*/
const form = document.getElementById('form');
form.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    saveFormData();
  }
});