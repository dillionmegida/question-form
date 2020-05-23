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

Question.prototype.isCorrect = function (id) {
    return this.answerID === id;
};

export default Question;
