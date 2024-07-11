import React, { useContext } from 'react'
import Modal from './Modal'
import CartContext from '../store/CartContext'
import { currencyformater } from '../util/formatting'
import UserProgressContext from '../store/userProgressContext'
import Button from './Button'
import CartItem from './CartItem'
export default function Cart() {
    const userProgressCtx=useContext(UserProgressContext)
    const cartCtx=useContext(CartContext)

    const cartTotal=cartCtx.items.reduce((totalprice,item)=>totalprice+item.quantity*item.price,0)

    function handleCloseCart(){
        userProgressCtx.hideCart()
    }
    function handleGotoCheckout(){
        userProgressCtx.showCheckout()
    }
  return (
    <Modal className='cart' open={userProgressCtx.progress==="cart"} onClose={userProgressCtx.progress==="cart"?handleCloseCart:null}> 
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item=>(
                <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} onIncrease={()=>cartCtx.addItem(item)} onDecrease={()=>cartCtx.removeItem(item.id)}/> 
            ))}

        </ul>
        <p className='cart-total'>{currencyformater.format(cartTotal)}</p>
        <p className='modal-actions'>
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            {cartCtx.items.length>0 &&<Button  onClick={handleGotoCheckout}>Go To CheckOut</Button>} 

        </p>

    </Modal>
  )
}
