import { calculateInvestmentResults } from "../util/investment"
import { formatter } from "../util/investment"
function Result(props){
   
   const calculateddata=calculateInvestmentResults(props.data)
   
 
    return(
        <table id="result">
            <thead>
                <tr>
                    <td>year</td>
                    <td>interest</td>
                    <td>valueEndOfYear</td>
                    <td> annualInvestment</td>
                </tr>


            </thead>
            <tbody>
                {calculateddata.map((item,index)=>{return(
                <tr key={index}>
                    <td>{item.year}</td>
                    <td>{formatter.format(item.interest)}</td>
                    <td>{formatter.format(item.valueEndOfYear)}</td>
                    <td>{formatter.format(item. annualInvestment)}</td>

                </tr>)

                })}

            </tbody>

        </table>
    )
}

export default Result