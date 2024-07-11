import React, { useContext } from 'react'
import Modal from './Modal'
import CartContext from '../store/CartContext'
import { currencyformater } from '../util/formatting'
import Input from './Input'
import Button from './Button'
import UserProgressContext from '../store/userProgressContext'

export default function CheckOut() {
    const cartCtx=useContext(CartContext)
    const userProgressCtx=useContext(UserProgressContext)

    const cartTotal=cartCtx.items.reduce((totalprice,item)=>totalprice+item.quantity*item.price,0)

  function handleClose(){
    userProgressCtx.hideCheckout()
  }

  function handleSubmit(event){
    event.preventDefault()
    const fd=new FormData(event.target)
    const customerData=Object.fromEntries(fd.entries( ))

    fetch('http://localhost:3000/orders',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            order:{
                items:cartCtx.items,
                customer:customerData
            }
        })
    })

  }
  
    return (
    <Modal open={userProgressCtx.progress==="checkout"} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>CheckOut</h2>
            <p>Total Amount: {currencyformater.format(cartTotal)}</p>
            <Input label="Full Name" type="text" id="name"/>
            <Input label="E-Mail Address" type="email" id="email"/>
            <Input label="Street" type="text" id="street"/>
            <div className='control-row'>
                <Input label="Postal Code" type="text" id="postal-code"/>
                <Input label="City" type="text" id="city" />
            </div>
            <p className='modal-actions'>
                <Button type="button" textOnly onClick={handleClose}>Close</Button>
                <Button>Submit Order</Button>

            </p>
        </form>

    </Modal>
  )
}
