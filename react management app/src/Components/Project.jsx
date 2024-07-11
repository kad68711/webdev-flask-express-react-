import Tasks from "./Tasks";

export default function Project(props) {
  
   const formattedDate=new Date(props.project.duedate).toLocaleDateString("en-us",{
    year:"2-digit",
    month:"short",
    day:"numeric"

   })
  return (
    <div className="w-[35rem] mt-16">
        <header className="pb-4 mb-4 border-b-2 border-stone-300">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-stone-600 mb-2">

                {props.project.title}
            </h1>
            <button className="text-stone-600 hover:text-stone-950" onClick={props.ondelete}>Delete</button>
            </div>
      <p className="mb-4 text-stone-400">{formattedDate}</p>
      <p className="text-stone-600 whitespace-pre-wrap">{props.project.description}</p>
    
        </header>
      
      <Tasks onaddtask={props.onaddtask} ondeletetask={props.ondeletetask} tasks={props.tasks}/>
    </div>



  );
}
