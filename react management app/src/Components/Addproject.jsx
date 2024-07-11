import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function Addproject(props) {
    let titleref=useRef();
    let descriptionref=useRef();
    let duedateref=useRef();
    let modal=useRef()

    function clear(){
        titleref.current.value=""
        descriptionref.current.value=""
        duedateref.current.reset()

    }
    function handlesave(){
        const enteredtitle=titleref.current.value
        const enteredescription=descriptionref.current.value
        const enteredduedate=duedateref.current.value

        if (enteredtitle.trim()==""||enteredescription.trim()==""||enteredduedate.trim()==""){
            modal.current.showModal()

            

        }
        else{

        props.addproject({title:enteredtitle,description:enteredescription,duedate:enteredduedate})}

    }
 
  return (
    <>
    <Modal ref={modal}>
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">opps forgot to add value</p>
        <p className="text-stone-600 mb-4">please ensure every input field has valid value</p>
    </Modal>
    <div  className="w-[35rem] mt-16">
       <menu className="flex items-center justify-end gap-4 my-4">
      <li><button className="text-stone-800 hover:text-stone-950" onClick={clear}>Cancel</button></li>
       <li><button onClick={handlesave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"  >Save</button></li>


       </menu>

       <div>
     
    
     <Input type="text" ref={titleref} label="Title" />
     <Input  ref={descriptionref}  label="Description" textarea={true} />
     <Input  type="date" ref={duedateref} label="Due Date" />
   
      
      </div>
      
    </div>
    </>
  );
}
