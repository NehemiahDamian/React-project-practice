/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
const AddItem = (props) => {

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [type, setType] = useState("")
  const [brand, setBrand] = useState("")

  // const searchButtonPressed = () => {

  //   props.callBack({ name: name, price: price, type: type, brand: brand })

  // }

  return (
    <div className='container'>
      <div className="row"><h2>Add Item</h2></div>

      <div className="row">
        <label htmlFor="name-field">name:</label>
        <input id='name-field' type="text" value={name}
          onChange={(e) => {
            setName(e.target.value)
          }} />

        <label htmlFor="price-field"> price:</label>
        <input id='price-field' type="number" value={price} onChange={(e) => {
          setPrice(e.target.value)
        }} />

        <label htmlFor="type-field">Type:</label>
        <input id='type-field' type="text" value={type} onChange={(e) => {
          setType(e.target.value)
        }} />

        <label htmlFor="brand-field">brand:</label>
        <input id='brand-field' type="text" value={brand} onChange={(e) => {
          setBrand(e.target.value)
        }} />
  </div>
        <div className="row mt-3">
        <button onClick={() => {
          props.addItem({ name: name, price: price, type: type, brand: brand })
          setName("")
          setPrice(0)
          setType("")
          setBrand("")
        }} className='btn btn-primary' type='button'>Add Item</button>
        </div>

    </div>
  )
}

export default AddItem;
