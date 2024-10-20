// src/components/RestaurantCard.jsx
import React, { useState } from 'react';
import AddToCart from './AddToCart.jsx';

const RestaurantCard = ({ restaurant, query }) => {
  const { name, averageRating,description } = restaurant; // Destructure name and rating from restaurant data
  const [itemCount, setItemCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [openDrawer,setOpenDrawer]=useState(false);

  const handleAddToCart = () => {
    const data = {
        name,
        description,
        itemCount, // Use the current itemCount for this item
    };

    setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(item => item.name === name);
        if (existingItemIndex > -1) {
            // If the item already exists, update the itemCount
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex].itemCount += itemCount; // Adjust based on your logic
            return updatedItems;
        } else {
            // If it's a new item, add it to the cart
            return [...prevItems, data];
        }
    });
    
    setOpenDrawer(true);
  };


  const addItem = () => {
    setItemCount((prev) => prev + 1);
  }

  const closeDrawer = () => {
    setOpenDrawer(false);
  }

  const subtractItem = () => {
    setItemCount((prev) => prev > 0 ? prev - 1 : prev);
  }


  return (
    <>
    <div className="border rounded-lg shadow-md overflow-hidden">
      <img src={`/${query}.jpg`} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold">{name}</h2>


        <div class="flex items-center justify-center">
          {Array.from({ length: averageRating }, (_, i) => i + 1)?.map((rating, index) => (
            <svg key={index} class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          ))}
          
        </div>
        <div className="flex items-center mt-2 justify-between">

          <button className='bg-green-800 text-white px-3 py-1 rounded flex justify-around w-28'>
            <span onClick={subtractItem} className="text-lg">-</span>
            <div className="h-7 w-px bg-white mx-2" />
            <span >{itemCount}</span>
            <div className="h-7 w-px bg-white mx-2" />
            <span onClick={addItem} className="text-lg">+</span>


          </button>
          <button
            onClick={()=>handleAddToCart()}
            className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 flex items-center"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    {openDrawer && <AddToCart open={openDrawer} cartItems={cartItems} query={query} totalItems={itemCount} onClose={closeDrawer}/>}
    </>
  );
};

export default RestaurantCard;
