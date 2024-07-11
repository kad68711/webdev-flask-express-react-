import image from "../assets/quiz-complete.png";
import QUESTIONS from "../question"
function Summary({userAnswers}) {
    const skippedanswers=userAnswers.filter(answer=>answer==null)
    const correctanswers=userAnswers.filter((answer,index)=>answer==QUESTIONS[index].answers[0])
    const skippedanswersshare=Math.round(skippedanswers.length/userAnswers.length*100)
    const correctanswersshare=Math.round(correctanswers.length/userAnswers.length*100)
    const wronganswersshare=100-skippedanswersshare-correctanswersshare
  return (
    <div id="summary">
      <img src={image} alt="quiz-complete" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedanswersshare}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctanswersshare}%</span>
          <span className="text">Answered Correctly</span>
        </p>
        <p>
          <span className="number">{wronganswersshare}%</span>
          <span className="text">Answered Incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer,index)=>{

           let cssClass="user-answer"
            if (answer==null){
                cssClass+=" skipped"
            }else if(answer==QUESTIONS[index].answers[0]){
                cssClass+=" correct"
            }else{
                cssClass+=" wrong"
            }
            return(<li key={index}>
                <h3>{index+1}</h3>
                <p className="question">{QUESTIONS[index].text}</p>
                <p className={cssClass}>{answer??"Skipped"}</p>
            </li>)
        })}
        
      </ol>
    </div>
  );
}

export default Summary;
