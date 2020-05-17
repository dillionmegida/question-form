import React, { useContext } from "react";
import styles from "./index.module.scss";

import Store, { store } from "./store";
import QuestionBlock from "./q-block";

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
    const globalState = useContext(store);
    console.log(globalState);

    const { dispatch } = globalState;
    console.log({ dispatch });

    const onSubmit = () => {
        dispatch({
            type: "UPDATE_SUBMITTED_STATUS",
            payload: true,
        });
    };

    const resetQuestions = () => {
        dispatch({
            type: "RESET",
        });
    };

    return (
        <Store>
            <section className={styles.questionsSection}>
                <ol className={styles.questionsContainer}>
                    {questions.map((question, i) => (
                        <QuestionBlock
                            key={`question-${i}`}
                            questionID={i}
                            question={question.name}
                            options={question.options}
                            answerID={question.answer}
                        />
                    ))}
                    <div>
                        <button
                            disabled={
                                globalState.submitted === true ? true : false
                            }
                            onClick={onSubmit}
                            className={styles.submitBtn}
                        >
                            Submit
                        </button>
                        <button
                            onClick={resetQuestions}
                            className={styles.resetBtn}
                        >
                            Reset
                        </button>
                        {globalState.submitted && (
                            <span
                                className={`${styles.scoreText} ${
                                    globalState.score >= questions.length / 2
                                        ? styles.pass
                                        : styles.fail
                                }`}
                            >
                                {globalState.score}/{questions.length}
                            </span>
                        )}
                    </div>
                </ol>
            </section>
        </Store>
    );
};

export default Questionnaire;
