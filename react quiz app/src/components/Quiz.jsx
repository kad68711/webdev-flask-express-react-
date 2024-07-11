import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../question";


import Question from "./Question";
import Summary from "./Summary";

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(SelectedAnswer) {
     
      setUserAnswers((prevvalue) => [...prevvalue, SelectedAnswer]);

     
    },
    []
  );

  const handleSkipanswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  const quizcomplete = activeQuestionIndex === QUESTIONS.length;
  if (quizcomplete) {
    return (
      <Summary userAnswers={userAnswers}/>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onskipanswer={handleSkipanswer}
      />
    </div>
  );
}

export default Quiz;
