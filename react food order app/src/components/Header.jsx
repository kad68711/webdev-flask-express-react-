import { useContext } from "react"
import logoimg from "../assets/logo.jpg"
import Button from "./Button"
import CartContext from "../store/CartContext"
import Cart from "./Cart"
import UserProgressContext from "../store/userProgressContext"
export default function Header() {

    const userProgressCtx=useContext(UserProgressContext)

    const cartCtx=useContext(CartContext)

    const totalCartItems=cartCtx.items.reduce((totalNumberofItems,item)=>{
        return totalNumberofItems+item.quantity
    },0)

    function handleshowcart(){
        userProgressCtx.showCart()
    }

  return (
    <header id="main-header">

        <div id="title"> 
            <img src={logoimg} alt="food app logo" />
            <h1>ReactFood</h1>

        </div>
        <nav>
            <Button textOnly={true} onClick={handleshowcart}>Cart ({totalCartItems})</Button>
        </nav>

    </header>

  )
}