import NewTask from "./NewTask"
export default function Tasks(props){
    return <section>
        <h2 className="text-2xl font-bold text-stone-700 mb-4">tasks</h2>
        <NewTask onaddtask={props.onaddtask} />
        {props.tasks.length==0? <p className="text-stone-800 my-4">
            You dont have any task yet
        </p>:<ul className="p-4 mt-8 rounded-md bg-stone-100">

            {props.tasks.map(task=>{
                return <li className="flex justify-between my-4" key={task.id}><span >{task.text}</span><button onClick={()=>props.ondeletetask(task.id)} className="text-stone-700 hover:text-red-500">Clear</button></li>
            })}

</ul>}
       
        
    </section>
}