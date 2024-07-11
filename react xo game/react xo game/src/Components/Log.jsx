

function Log(props) {
    
  return (
    <ol id="log">
        {props.gamehistory.map((item,index)=><li key={index}>{item.activeplayer} placed at {item.placement.row},{item.placement.col}</li>)}

    </ol>
  )
}

export default Log;
