import React, { useState } from "react";
import styles from "./index.module.scss";

import { optionIDFormat } from "../utils";
import PropTypes from "prop-types";
import Question from "../question-prototype";

const QuestionBlock = ({
    questionID: i,
    question,
    options,
    answerID,
    onSelectOption,
    submitted,
    // resetWasClicked,
}) => {
    const questionName = `question${i}`;

    const questionClass = new Question({
        questionID: i,
        question,
        options,
        answerID,
    });

    const [state, setState] = useState({
        selectedID: null,
        correct: null,
        specifiedCorrectAnswer: questionClass.answerID,
    });

    const { selectedID, correct, specifiedCorrectAnswer } = state;

    const isCorrect = selectedID === questionClass.isCorrect(selectedID);

    if (correct !== isCorrect) {
        if (isCorrect)
            setState({
                ...state,
                correct: true,
            });
        else
            setState({
                ...state,
                correct: false,
            });
    }

    return (
        <li className={styles.questionBlock}>
            <p className={styles.questionText}>{question}</p>
            <div className={styles.options}>
                {options.map((option, id) => {
                    const optionID = optionIDFormat(id, i);
                    return (
                        <div
                            key={`question${i}options${id}`}
                            className={`${styles.option} ${
                                // must be submitted before any of these applies
                                // wrong class block
                                submitted &&
                                !state.correct &&
                                state.selectedID === id &&
                                styles.wrongAnswer
                            } ${
                                // must be submitted before any of these applies
                                // correct class block
                                submitted &&
                                specifiedCorrectAnswer === id &&
                                styles.correctAnswer
                            }`}
                        >
                            <input
                                type="radio"
                                id={optionID}
                                name={questionName}
                                disabled={submitted}
                                onClick={() => {
                                    setState({ ...state, selectedID: id });
                                    onSelectOption(id);
                                }}
                            />
                            <label htmlFor={optionID}>{option}</label>
                        </div>
                    );
                })}
            </div>
        </li>
    );
};

QuestionBlock.propTypes = {
    questionID: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    answerID: PropTypes.number.isRequired,
};

export default QuestionBlock;
