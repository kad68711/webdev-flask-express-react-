

function Gameover(props) {
    
    return (
        <div id="game-board">
        <div id="game-over">
          <h2>GAME OVER</h2>
          <p>{props.gamestatus.winner} {props.gamestatus.winner=="DRAW"?null:"is the winner"} </p>
          <button onClick={() => location.reload()}>restart</button>
        </div>
        </div>
      
    )
  }
  
  export default Gameover;
  