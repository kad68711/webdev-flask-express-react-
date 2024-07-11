import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../question";
import Answers from "./Answers";
import { useState } from "react";
function Question({
  index,

  onSelectAnswer,

  onskipanswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
let timer=10000
if(answer.selectedAnswer){
    timer=1000

}else if(answer.isCorrect!=null){
    timer=2000
}
  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });
    setTimeout(
      () => {
        setAnswer({
          selectedAnswer: answer,
          isCorrect: QUESTIONS[index].answers[0] === answer,
        });

        setTimeout(() => {
          onSelectAnswer(answer);
        }, 2000);
      },

      1000
    );
  }

  let answerstate = "";

  if (answer.selectedAnswer &&answer.isCorrect!=null) {
    answerstate = answer.isCorrect ? "correct" : "wrong";
  }
  else if(answer.selectedAnswer){
    answerstate="answered"

  }
  return (
    <div id="question">
      <QuestionTimer key={timer}timeout={timer} onTimeout={answer.selectedAnswer==""?onskipanswer:null} mode={answerstate}/>
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerstate={answerstate}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}

export default Question;
