import Playerinfo from "./Components/playerinfo";
import Gameboard from "./Components/Gameboard";
import { useState, useEffect } from "react";
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./winning_combinations";
import Gameover from "./Components/Gameover";

function App() {
  const [gamehistory, setgameHistory] = useState([]);
  const [activeplayer, setactivePlayer] = useState("X");
  const [gameover, setgameover] = useState({ gameover: false, winner: null });
  useEffect(() => {
    if (gamehistory.length != 0) {
      checkwinner();
    }
  }, [gamehistory]);

  const xitem = [];
  const oitem = [];

  function checkwinner() {

    
    for (const item of gamehistory) {
      if (item.activeplayer == "X") {
        xitem.push(item.placement);
      } else {
        oitem.push(item.placement);
      }
    }

   
  // check if x is the winner
    for (const combination of WINNING_COMBINATIONS) {
      var x = 0;
      for (const item of xitem) {
        for (const comb of combination) {
          if (item.row == comb.row && item.col == comb.col) {
            x++;
          }
        }
      }
      if(x==3){setgameover({ gameover: true, winner: "X" });break}
      
      // check if o is the winner
    }
    for (const combination of WINNING_COMBINATIONS) {
      var o = 0;
      for (const item of oitem) {
        for (const comb of combination) {
          if (item.row == comb.row && item.col == comb.col) {
            o++;
          }
        }
      }
      if(o==3){setgameover({ gameover: true, winner: "O" });break}
      
    }
     // check for a draw
     if (xitem.length>4 || oitem.length>4){
      setgameover({ gameover: true, winner: "DRAW" });
     }
  }

  function changeplayer(row, col) {
    setgameHistory((prevvalue) => {
      return [
        { activeplayer: activeplayer, placement: { row: row, col: col } },
        ...prevvalue,
      ];
    });

    setactivePlayer((prevvalue) => (prevvalue == "X" ? "O" : "X"));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Playerinfo
            playername="player1"
            playersymbol="X"
            isactive={activeplayer == "X" ? true : false}
          />
          <Playerinfo
            playername="player2"
            playersymbol="O"
            isactive={activeplayer == "O" ? true : false}
          />
        </ol>
        {gameover.gameover?<Gameover  gamestatus={gameover}/>:
        <Gameboard
        activeplayer={activeplayer}
        changeactiveplayer={changeplayer}
       
      />}
        
      </div>
      <Log gamehistory={gamehistory} />
    </main>
  );
}

export default App;
