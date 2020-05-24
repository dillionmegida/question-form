import { pkgName } from "./";

function optionIDFormat(optionID, questionID) {
    return `option${optionID + 1}ForQuestion${questionID + 1}`;
    // + 1 to properly the option and question, because the id starts from 0
    // option with id of 0 (from the options array),
    // and question with id of 1 (from the questions array) will have option1ForQuestion2
}

function confirmQuestionFormat({ name, options, answer }) {
    if (name === undefined || typeof name !== "string") {
        throw new Error(
            `${pkgName}: 'name' property of type String is required as a property in the question object`
        );
    }
    if (options === undefined || !Array.isArray(options)) {
        throw new Error(
            `${pkgName}: 'options' property of type Array is required as a property in the question object`
        );
    }
    if (answer === undefined || typeof answer !== "number") {
        throw new Error(
            `${pkgName}: 'answer' property of type Number is required as a property in the question object`
        );
    }
    if (answer > options.length - 1) {
        throw new Error(
            `${pkgName}: 'answer' property must be the index of the answer in options, which must not be greater than the size (- 1) of the options array`
        );
    }
}

export { optionIDFormat, confirmQuestionFormat };
