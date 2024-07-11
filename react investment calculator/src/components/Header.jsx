import img from "../assets/investment-calculator-logo.png"

function Header(){

    return (
        <header>
        <img src={img} alt="image showing money bag" />
        <h1>React Investment Calculator</h1>
        </header>
    )



}

export default Header