import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

import Additem from "./Additem";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [list, setlist] = useState([]);
 

  function additem(value, setvalue) {
    setlist((prevvalue) => {
      return [
        ...prevvalue,
        { id: uuidv4(), title: value.title, content: value.content },
      ];
    });

    setvalue({ title: "", content: "" });
  }

  function deleteitem(id) {
    setlist((prevvalue) => {
      return prevvalue.filter((item) => item.id != id);
    });
  }
  return (
    <div>
      <Header />
      
      <Additem additem={additem} />
      {list.map((item) => {
        return (
          <Note
            key={item.id}
            id={item.id}
            title={item.title}
            content={item.content}
            delete={deleteitem}
          />
        );
      })}
     
      <Footer />
    </div>
  );
}

export default App;
