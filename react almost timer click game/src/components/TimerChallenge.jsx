import { useRef, useState } from "react";
import Result from "./Result.jsx";

export default function TimerChallenge(props) {
  const [timerExpired, settimerExpired] = useState(false);
  const [timerStarted, settimerStarted] = useState(false);
  const [result,setResult]=useState("Lost")

  let timer = useRef();
  let dialog = useRef();

  function handleStart() {
    timer.current = setTimeout(() => {
      settimerExpired(true);
      dialog.current.showModal();
      setResult("Lost")
      settimerStarted(false);
    }, props.targetTime * 1000);

    settimerStarted(true);
  }
  function handleStop() {
    dialog.current.showModal()
    setResult("Won")
    settimerStarted(false)
    clearTimeout(timer.current);
  }

  return (
    <>
      <Result ref={dialog} targetTime={props.targetTime} result={result} />
      <section className="challenge">
        <h2>{props.title}</h2>

        <p className="challenge-time">
          {props.targetTime} second{props.targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop Challenge" : "Start Challenge"}
          </button>
        </p>
        <p className={timerStarted ? "active" : ""}>
          {timerStarted ? "Timmer is running..." : "Timer Inactive"}
        </p>
      </section>
    </>
  );
}
