
import { useState,useRef } from "react";

export default function Player() {
  const nameref=useRef()
  const [name,setname]=useState("unknown entity")


  function handleclick(){
    setname(nameref.current.value)
    nameref.current.value=""
  }

  return (
    <section id="player">
      <h2>Welcome {name}</h2>
      <p>
        <input ref={nameref} type="text" />
        <button onClick={handleclick}>Set Name</button>
      </p>
    </section>
  );
}
