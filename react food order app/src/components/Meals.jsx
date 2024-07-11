
import MealItem from "./MealItem"
import useHttp from "../hooks/useHttp"
import Error from "./Error"

const resquestobject={}

export default function Meals() {
   const {data:loadedMeals,isLoading,error}=useHttp('http://localhost:3000/meals',resquestobject,[])

   if( isLoading){
    return <p className="center">FetchingMeals....</p>
   }

   if(error){
    return <Error title="Failed to fetch Meals" message={error}/>
   }

   
  return (
    <ul id="meals" >
        {loadedMeals.map(meal=>{
            return <MealItem key={meal.id} meal={meal}/>
        })}
    </ul>
  )
}
