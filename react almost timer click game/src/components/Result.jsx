 import { forwardRef } from "react"
 
 
 const Result= forwardRef((props,ref)=>{
    
    console.log(ref)
    return(
        <dialog ref={ref} className="result-modal" >
            <h2>You {props.result}</h2>
            <p>The target time was <strong>{props.targetTime} seconds</strong></p>
            <p> You stopped the timer with <strong>X seconds left</strong><u>(...you can add this feature if you want you need to use setinterval though)</u></p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    )
})

export default Result