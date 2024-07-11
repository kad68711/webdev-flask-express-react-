
import Header from "./components/Header"
import UserInput from "./components/Userinput"
import { useState } from "react"
import Result from "./components/Results"

  // - initialInvestment: The initial investment amount
  // - annualInvestment: The amount invested every year
  // - expectedReturn: The expected (annual) rate of return
  // - duration: The investment duration (time frame)

function App() {
  const [data,setdata]=useState({initialInvestment:10000,annualInvestment:10,expectedReturn:10,duration:10})

  function datasetter(name,value){
    setdata(prevvalue=>{
      return{...prevvalue,[name]:+value}
      
    })

   
  }
  return (
    <>
    <Header/>
    <UserInput data={data} setdata={datasetter}/>
    <Result  data={data}/>
    </>
  )
}

export default App
