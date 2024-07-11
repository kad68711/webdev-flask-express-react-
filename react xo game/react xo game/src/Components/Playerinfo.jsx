import { useState } from "react";

function Playerinfo(props) {
  const [clicked, setclicked] = useState(false);
  const [name,setName]=useState(null);

  return (
    <li className={props.isactive?"active":null}>
      <span className="player">
        {clicked ? (
          <input type="text" onChange={(event)=>setName(event.target.value)}/>
        ) : (
          <span className="player-name" hidden={clicked}>
            {name||props.playername}
          </span>
        )}

        <span className="player-symbol">{props.playersymbol}</span>
      </span>
      <button onClick={() => {clicked ? setclicked(false) : setclicked(true)}}>
        {clicked ? "Save" : "edit"}
      </button>
    </li>
  );
}

export default Playerinfo;
