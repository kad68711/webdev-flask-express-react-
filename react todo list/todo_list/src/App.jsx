import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [value, setvalue] = useState("");
  const [list, setlist] = useState([]);
  const [style, setstyle] = useState(false);

  function additem() {
    if (value != "") {
      setlist((prevvalue) => {
        return [...prevvalue, { id: uuidv4(), value: value }];
      });
    }
    setvalue("");
  }
  function setitem(event) {
    setvalue(event.target.value);
  }

  function removefromlist(id) {
    setlist((prevvalue) => {
      return prevvalue.filter((item) => item.id !== id);
    });
    console.log(list);
  }

  function togglestyle(event) {
   if(event.target.style.textDecoration=="line-through"){
    event.target.style.textDecoration="";
   }
    else{
      event.target.style.textDecoration="line-through"
    }
    
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
        <h2>
          To remove any item Doubleclick ,to cross/uncross it use a single click
        </h2>
      </div>
      <div className="form">
        <input type="text" value={value} onChange={setitem} />
        <button onClick={additem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {list.map((item) => {
            return (
              <li
                key={item.id}
                
                onClick={ togglestyle}
                onDoubleClick={() => removefromlist(item.id)}
              >
                {item.value}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
