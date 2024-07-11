import { useState } from "react";

function Gameboard(props) {
  const [gameboard, setGameboard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  function handleclick(row, col) {
    if (gameboard[row][col] == null) {
      setGameboard((prevvalue) => {
        const newvalue = [...prevvalue];

        newvalue[row][col] = props.activeplayer;

        return newvalue;
      });
      props.changeactiveplayer(row, col);
    }
  }

  return (
    <ol id="game-board">
    {gameboard.map((row, rowindex) => (
      <li key={rowindex}>
        <ol>
          {row.map((item, colindex) => (
            <li key={colindex}>
              <button onClick={() => handleclick(rowindex, colindex)}>
                {item}
              </button>
            </li>
          ))}
        </ol>
      </li>
    ))}
  </ol>
  )
   
       
    
    
 
}

export default Gameboard;
