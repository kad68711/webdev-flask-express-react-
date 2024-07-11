function UserInput(props) {
  // - initialInvestment: The initial investment amount
  // - annualInvestment: The amount invested every year
  // - expectedReturn: The expected (annual) rate of return
  // - duration: The investment duration (time frame)
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>initialInvestment</label>
          <input type="number" value={props.data.initialInvestment }onChange={(event)=>props.setdata("initialInvestment",event.target.value)}required/>
        </p>
        <p>
          <label>annualInvestment</label>
          <input type="number" value={props.data.annualInvestment }onChange={(event)=>props.setdata("annualInvestment",event.target.value)}required/>
        </p>
      </div>
      <div className="input-group">
        <p>
          <label> expectedReturn</label>
          <input type="number" value={props.data.expectedReturn }onChange={(event)=>props.setdata("expectedReturn",event.target.value)}required/>
        </p>
        <p>
          <label>duration</label>
          <input type="number" value={props.data.duration }onChange={(event)=>props.setdata("duration",event.target.value)}required/>
        </p>
      </div>
    </section>
  );
}

export default UserInput;
