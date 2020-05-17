import React, { useContext, useState } from "react";
import styles from "./index.module.scss";

import { optionIDFormat } from "../utils";
import PropTypes from "prop-types";
import Question from "../q-prototype";
// import { useGlobalState } from "../store";

const QuestionBlock = ({
    questionID: i,
    question,
    options,
    answerID,
    selectedVal = null,
}) => {
    const questionName = `question${i}`;

    const questionClass = new Question({
        questionID: i,
        question,
        options,
        answerID,
    });

    const [state, setState] = useState({
        selected: false,
        wrong: false,
        correct: false,
    });

    // const [globalState, dispatch] = useGlobalState();

    if (state.selected)
        dispatch({
            type: "INCREASE_SCORE",
            payload: state.correct && 1,
        });

    if (selectedVal !== null) {
        const isCorrect = questionClass.isCorrect(selectedVal);
        if (isCorrect)
            setState({
                ...state,
                correct: true,
            });
        else
            setState({
                ...state,
                wrong: true,
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
                                selectedVal === null
                                    ? null
                                    : state.correct
                                    ? styles.correctAnswer
                                    : styles.wrongAnswer
                            }`}
                            id={`divFor-${optionID}`}
                        >
                            <input
                                type="radio"
                                id={optionID}
                                name={questionName}
                                disabled={globalState.submitted ? true : false}
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
