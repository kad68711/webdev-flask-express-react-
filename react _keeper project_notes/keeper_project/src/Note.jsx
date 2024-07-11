import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
    
    
    return (
      <div className="note">
        <h1 >{props.title}</h1>
        <p>{props.content}</p>
        <button type="delete" onClick={()=>props.delete(props.id)}><DeleteIcon/></button>
      </div>
    )
  }
  
  export default Note;
  


 