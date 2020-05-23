function optionIDFormat(optionID, questionID) {
    return `option${optionID + 1}ForQuestion${questionID + 1}`;
    // + 1 to properly the option and question, because the id starts from 0
    // option with id of 0 (from the options array),
    // and question with id of 1 (from the questions array) will have option1ForQuestion2
}

export { optionIDFormat };
