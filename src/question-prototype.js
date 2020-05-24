import { pkgName } from "./";

function Question({ questionID, question, options, answerID }) {
    if (typeof questionID !== "number")
        throw new Error(
            `${pkgName}: First argument (questionID) in Question Prototype must be a number`
        );
    if (typeof question !== "string")
        throw new Error(
            `${pkgName}: Second argument (question) in Question Prototype must be a string`
        );
    if (!Array.isArray(options))
        throw new Error(
            `${pkgName} Third argument (options) in Question Prototype must be an array`
        );
    if (typeof answerID !== "number")
        throw new Error(
            `${pkgName} Fourth argument (answerID) in Question Prototype must be a number representing the index of the answer in options`
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
