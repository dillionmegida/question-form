import React, { useState } from "react";
import styles from "./index.module.scss";

import QuestionBlock from "./question-block";
import QuestionPrototype from "./question-prototype";

const initialQs = [
    {
        name:
            "What element is responsible for growth in the body, What element is responsible for growth in the bodyWhat element is responsible for growth in the body",
        options: [
            "What element is responsible for growth in the body, What element is responsible for growth in the body",
            "bla",
            "yos",
        ],
        answer: 2,
    },
    {
        name: "question 2",
        options: ["yo", "bla", "yos"],
        answer: 1,
    },
];

const Questionnaire = ({ questions = initialQs }) => {
    const [state, setState] = useState({
        answers: [],
        submitted: false,
        reset: false,
        errorMsg: false,
        score: 0,
    });

    const { submitted, answers, errorMsg, reset, score } = state;

    const questionClasses = questions.map(
        ({ name, options, answer }, id) =>
            new QuestionPrototype({
                questionID: id,
                question: name,
                options: options,
                answerID: answer,
            })
    );

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

    const resetQuestions = () => {
        return setState({
            reset: true,
            answers: [],
            submitted: false,
            errorMsg: false,
        });
    };

    return (
        <section className={styles.questionsSection}>
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
                    disabled={submitted ? true : false}
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

export default Questionnaire;
