function optionIDFormat(optionID, questionID) {
    return `option${optionID + 1}ForQuestion${questionID + 1}`;
    // + 1 to properly the option and question, because the id starts from 0
    // option with id of 0 (from the options array),
    // and question with id of 1 (from the questions array) will have option1ForQuestion2
}

// for cases like applying colors on correct and wrong answers
function getOptionFromDocument(optionID, questionID) {
    const id = optionIDFormat(optionID, questionID);
    return document.getElementById(id);
}

function resetQuestions() {
    questionsContainer.querySelectorAll("input").forEach((input) => {
        input.checked = false;
        input.removeAttribute("disabled");
        input.parentElement.classList.remove("wrongAnswer");
        input.parentElement.classList.remove("correctAnswer");
    });

    const submitBtn = document.getElementById("submitBtnForQuestions");
    submitBtn.removeAttribute("disabled");
    submitBtn.innerText = "Submit";

    document.getElementById("scoreText").style.display = "none";
}

function submitQuestions(e) {
    e.preventDefault();

    const questionBlocks = questionsContainer.querySelectorAll(
        ".question-block"
    );

    let selected = [];
    let choiceWasMadeForQuestions = false;

    // using for loop instead of forEach so that I can stop the loop easily
    for (let i = 0; i < questionBlocks.length; i++) {
        const qBlock = questionBlocks[i];

        let valForChoice = null;
        const options = qBlock.querySelectorAll(".options");

        choiceWasMadeForQuestions = false;

        options.forEach((option) => {
            const inputs = option.querySelectorAll("input");
            inputs.forEach((input) => {
                if (input.checked === true) {
                    valForChoice = input.parentElement.querySelector("label")
                        .innerText;
                    selected.push(valForChoice);
                    choiceWasMadeForQuestions = true;
                }
            });
        });

        if (choiceWasMadeForQuestions === false) {
            alert("Please answer all questions");
            // don't continue the loop
            i = questionBlocks.length;
        }
    }

    if (choiceWasMadeForQuestions === false) return;

    questionsContainer.querySelectorAll("input").forEach((input) => {
        input.disabled = true;
    });

    const validations = [];
    let correctOptions = 0;

    selected.forEach((choice, i) => {
        const questionClass = questionClassArray[i];
        const isCorrect = questionClass.isCorrect(choice);

        if (isCorrect) correctOptions += 1;

        const correctAnswerID = questionClass.answer;
        validations.push({
            questionID: questionClass.questionID,
            optionID: questionClass.getOptionID(choice),
            correctAnswerID,
            isCorrect,
        });
    });

    validations.forEach((choice, i) => {
        const choiceIDFromQuestion = getOptionFromDocument(
            choice.optionID,
            choice.questionID
        );
        const optionDiv = choiceIDFromQuestion.parentElement;
        if (choice.isCorrect) {
            optionDiv.classList.add("correctAnswer");
        } else {
            const correctOptionID = getOptionFromDocument(
                choice.correctAnswerID,
                choice.questionID
            );
            const correctOptionDiv = correctOptionID.parentElement;
            correctOptionDiv.classList.add("correctAnswer");
            optionDiv.classList.add("wrongAnswer");
        }

        const submitBtn = document.getElementById("submitBtnForQuestions");
        submitBtn.disabled = true;
        submitBtn.innerText = "Submitted!";

        const scoreText = document.getElementById("scoreText");
        if (correctOptions >= questions.length / 2) {
            scoreText.classList.add("pass");
        } else {
            scoreText.classList.add("fail");
        }
        scoreText.innerText = `${correctOptions}/${questions.length}`;
        scoreText.style.display = "inline-block";
    });
}

export {
    optionIDFormat,
    getOptionFromDocument,
    resetQuestions,
    submitQuestions,
};
