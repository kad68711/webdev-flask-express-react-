import { useRef } from "react"

export default function NewTask(props){

    let inputref=useRef()

    function handleclick(){
        
        if(inputref.current.value.trim()==""){
            return;
        }
        props.onaddtask(inputref.current.value)
        inputref.current.value=""
    }

    return <div className="flex items-center gap-4">

        <input ref={inputref}className="w-64 px-2  py-1 rounded-sm bg-stone-200" type="text" />
        <button onClick={handleclick}className="text-stone-700 hover:text-stone-950">Add Task</button>
    </div>
}