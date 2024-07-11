import { useRef } from "react";

function Answers({ answers, selectedAnswer, answerstate, onSelect }) {
  let shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer == answer;
        let cssclass = "";
        if (answerstate == "answered" && isSelected) {
          cssclass = "selected";
        }
        if (
          (answerstate == "correct" || answerstate == "wrong") &&
          isSelected
        ) {
          cssclass = answerstate;
        }

        return (
          <li key={answer} className="answer">
            <button className={cssclass} onClick={() => onSelect(answer)} disabled={answerstate!=""}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Answers;
