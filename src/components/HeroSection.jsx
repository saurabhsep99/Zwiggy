// src/components/HeroSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import api from '../api/axios';
import RestaurantListing from './RestaurantListing.jsx';

const HeroSection = () => {
  const [inputValue, setInputValue] = useState('');
  const [restaurantList, setRestaurantList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const foods = ['biryani', 'momos', 'pasta', 'pizza', 'sandwich']; // Sample data

  const wrapperRef = useRef(null); // Ref to detect clicks outside

  // Handle input change and filter suggestions
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filteredSuggestions = foods.filter((food) =>
        food.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Fetch restaurant data from API based on the selected suggestion
  const fetchData = async (suggestion) => {
    try {
      const res = await api.get(`/api/restaurant/search_by_menu?menuItem=${suggestion}`);
      setRestaurantList(res.data); // Assuming `data` contains restaurants list
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = async (suggestion) => {
    setInputValue(suggestion);
    setSelectedItem(suggestion)
    setSuggestions([]); // Close suggestions dropdown
    await fetchData(suggestion); // Fetch restaurants based on selected suggestion
  };

  // Handle click outside to close suggestions
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  // Attach and cleanup click event listener for detecting outside clicks
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (

    <>
    <section className="relative flex justify-center mt-10">
      {/* White Background Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-75"></div>

      {/* Hero Content */}
      <div className="relative z-10 bg-white bg-opacity-75 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-5xl font-bold text-orange-500">
          Order Your Favorite Foods
        </h1>
        <p className="mt-4 text-gray-700">
          Fresh and tasty seafood curry sit amet, consectetur adipiscing elit.
        </p>

        {/* Autocomplete Input */}
        <div className="relative mt-6" ref={wrapperRef}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Search for food..."
          />

          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 cursor-pointer hover:bg-orange-100"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>

    {/* Restaurant Listing */}
    <RestaurantListing restaurants={restaurantList} query={selectedItem} />
    </>
  );
};

export default HeroSection;
