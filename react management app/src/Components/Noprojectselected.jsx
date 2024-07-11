import image from "../assets/no-projects.png"
export default function NoprojectSelected(props){

    return(
        <div className="mt-24 text-center  w-2/3">
            <img className="w-16 h-16 object-contain mx-auto"src={image} alt="an empty list image" />
            <h2 className="text-xl font-bold text-stone-500 my-4">No Project Selected</h2>
            <p className="text-stone-400 mb-4">Select a project to get Started or Create a new one</p>
            <p className="mt-8">
                <button onClick={props.showaddproject}className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Create a new project</button>
            </p>

        </div>

    )
}