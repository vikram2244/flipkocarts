import React from 'react'
import { mobileData } from '../Data/proData'
import Cardss from '../../Card/Cardss'
import { useCart } from '../Context/CartContext';

const ProData = ({handleClick}) => {
  const { addToCart } = useCart();
           
             const handleAddToCart = (item) => {
               addToCart(item);
               handleClick(); 
             };
  return (
    <>
    <div>
      <h1>proData</h1>
    </div>
    <div className='mobiles-grid'>
    {mobileData.slice(0,4).map((data,index)=>(
    <Cardss
    key={index}
     id={data.id}
            name={data.product}
          title={data.company}       
          image={data.image}          
          description={data.description} 
          amount={data.price}
          product={data.product}
            handleClick={() => handleAddToCart(data)}
    />
    )
    )
}
</div>
    </>
  )
}

export default ProData