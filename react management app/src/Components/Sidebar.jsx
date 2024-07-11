export default function Sidebar(props) {
 

  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-800 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">YOUR PROJECTS</h2>
      <div>
      <button className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"onClick={props.showaddproject}>+ ADD Project</button>
      </div>

      <ul className="mt-8">
        {props.projects.map(item=>{

            let buttonstyle="w-full text-left px-2 py-1 rounded-sm my-1  hover:text-stone-200 hover:bg-stone-900"
            if(item.id==props.selectedproject_id){
                buttonstyle+=" bg-stone-800 text-stone-200"
            }
            else{
                buttonstyle+=" text-stone-400"
            }
            return <li key={Math.random()}id={item.id}>
                <button onClick={()=>props.onselectproject(item.id)}className={buttonstyle}>{item.title}</button></li>
        })}
       
      </ul>
    </aside>
  );
}
