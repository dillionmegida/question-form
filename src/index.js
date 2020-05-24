import React, { useState } from "react";
import styles from "./index.module.scss";

import QuestionBlock from "./question-block";
import QuestionPrototype from "./question-prototype";
import { confirmQuestionFormat, pkgName } from "./utils";
import PropTypes from "prop-types";

const QuestionForm = ({
    questions = [
        {
            name: "What is React?",
            options: ["React is this", "React is that", "React is cool"],
            answer: 0,
        },
        {
            name: "What is science?",
            options: ["Science is bad", "Science is good", "Science is wow"],
            answer: 2,
        },
    ],
    color = "#ddd",
}) => {
    if (!Array.isArray(questions)) {
        throw new Error(
            `${pkgName}: 'questions' prop must be of type array, with each question as an object with property name, options and answer`
        );
    }

    if (questions.length < 1) return <></>;

    const [state, setState] = useState({
        answers: [],
        submitted: false,
        reset: false,
        errorMsg: false,
        score: 0,
    });

    const { submitted, answers, errorMsg, reset, score } = state;

    const questionClasses = questions.map(({ name, options, answer }, id) => {
        confirmQuestionFormat({ name, options, answer });

        return new QuestionPrototype({
            questionID: id,
            question: name,
            options: options,
            answerID: answer,
        });
    });

    const selectOption = (questionID, optionID) => {
        const prevChosenID = answers.findIndex(
            (answer) => answer.questionID === questionID
        );

        if (prevChosenID !== -1) {
            // then an option has been selected before
            const newAnswers = [...answers];
            newAnswers.splice(prevChosenID, 1, {
                questionID,
                optionID,
            });

            return setState({
                ...state,
                answers: newAnswers,
            });
        }

        const newAnswers = [...answers];
        newAnswers.push({
            questionID,
            optionID,
        });

        return setState({
            ...state,
            answers: newAnswers,
        });
    };

    const onSubmit = () => {
        setState({
            ...state,
            errorMsg: false,
        });

        if (answers.length !== questions.length) {
            // then not all questions has been answered
            return setState({
                ...state,
                errorMsg: true,
            });
        }

        // necessary to sort the answer array because user may have selected the
        // second option first, and the elements are pushed to the array
        const sortAnswerArr = (arr) =>
            arr.sort((a, b) => (a.questionID > b.questionID ? 1 : -1));

        const sortedAnswers = sortAnswerArr(answers);

        let score = 0;

        for (let i = 0; i < answers.length; i++) {
            const { optionID } = sortedAnswers[i];
            const question = questionClasses[i];
            const isCorrect = question.isCorrect(optionID);
            if (isCorrect) {
                score++;
            }
        }

        return setState({
            ...state,
            score,
            submitted: true,
        });
    };

    // TODO reset questions
    // const resetQuestions = () => {
    //     return setState({
    //         reset: true,
    //         answers: [],
    //         submitted: false,
    //         errorMsg: false,
    //     });
    // };

    return (
        <section
            style={{ border: `1px solid ${color}` }}
            className={styles.questionsSection}
        >
            <ol className={styles.questionsList}>
                {questions.map((question, i) => (
                    <QuestionBlock
                        key={`question-${i}`}
                        questionID={i}
                        question={question.name}
                        options={question.options}
                        answerID={question.answer}
                        onSelectOption={(optionID) => selectOption(i, optionID)}
                        submitted={submitted}
                        resetWasClicked={reset}
                    />
                ))}
            </ol>
            <div className={styles.options}>
                {errorMsg && (
                    <span className={styles.message}>
                        Please answer all questions!
                    </span>
                )}
                <button
                    disabled={submitted}
                    onClick={onSubmit}
                    className={styles.submitBtn}
                >
                    {submitted ? "Submitted!" : "Submit"}
                </button>
                {/* TODO reset questions
                <button onClick={resetQuestions} className={styles.resetBtn}>
                    Reset
                </button> */}
                {submitted && (
                    <span
                        className={`${styles.scoreText} ${
                            score >= questions.length / 2
                                ? styles.pass
                                : styles.fail
                        }`}
                    >
                        {score}/{questions.length}
                    </span>
                )}
            </div>
        </section>
    );
};

QuestionForm.propTypes = {
    questions: PropTypes.array.isRequired,
    color: PropTypes.string,
};

export default QuestionForm;
