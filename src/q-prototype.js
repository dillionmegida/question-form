function Question({ questionID, question, options, answerID }) {
    if (typeof questionID !== "number")
        throw new Error("First argument (questionID) must be a number");
    if (typeof question !== "string")
        throw new Error("Second argument (question) must be a string");
    if (!Array.isArray(options))
        throw new Error("Third argument (options) must be an array");
    if (typeof answerID !== "number")
        throw new Error(
            "Fourth argument (answerID) must be a number representing the index of the answer in options"
        );
    this.question = question;
    this.questionID = questionID;
    this.options = options;
    this.answerID = answerID;
}

Question.prototype.isCorrect = function (choice) {
    const correct = this.options[this.answerID];
    if (correct === choice) return true;
    return false;
};

Question.prototype.getOptionID = function (choice) {
    const optionID = this.options.findIndex((option) => option === choice);
    return optionID;
};

Question.prototype.getHTML = function (id) {
    const result = html({
        questionID: id,
        question: this.question,
        options: this.options,
    });

    return result;
};

export default Question;
