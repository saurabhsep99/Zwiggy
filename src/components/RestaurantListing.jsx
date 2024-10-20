// src/components/RestaurantListing.jsx
import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard.jsx';

const RestaurantListing = ({restaurants,query}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant._id} query={query} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantListing;
