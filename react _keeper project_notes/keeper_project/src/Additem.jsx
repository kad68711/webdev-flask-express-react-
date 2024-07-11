
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Zoom from '@mui/material/Zoom';



function Additem(props) {
  const [value, setvalue] = useState({ title: "", content: "" });
  const[zoom,setzoom]=useState(false)
  const [rows,setrows]=useState(0)

  function handlechange(event) {
    setvalue((prevvalue) => {
      return { ...prevvalue, [event.target.name]: event.target.value };
    });
  }

  return (
    <div>
      <form
        className="create-note"
        onSubmit={(event) => {
          event.preventDefault();
          props.additem(value, setvalue);
        }}
      >
        <input
          name="title"
          type="text"
          placeholder="TITLE"
          value={value.title}
          onChange={handlechange}
          hidden={!zoom}
        />
        <textarea
          name="content"
          placeholder="TAKE NOTE...."
          value={value.content}
          onChange={handlechange}
          onClick={()=>{setrows(3);setzoom(true)}}
          rows={rows}
        ></textarea>


        <Zoom in={zoom}>
        <IconButton type="submit" >
          <AddIcon />
        </IconButton>
        </Zoom>
      </form>
    </div>
  );
}

export default Additem;
