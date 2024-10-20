import React, { useState } from 'react';
import api from '../api/axios';
import Papa from 'papaparse'; // Import PapaParse

const AddRestaurantForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    phone: '',
    website: '',
    priceRange: '',
    menu: [], // Menu array will store the parsed menu items
  });

  const [message, setMessage] = useState('');
  const [csvUploadStatus, setCsvUploadStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle CSV upload and parsing
 
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      Papa.parse(file, {
        header: true, // Ensures the first row is treated as the header
        complete: (result) => {
          // Trim both keys (field names) and values
          const parsedMenu = result.data.map((item) => {
            // Create a new object with trimmed keys and values
            const trimmedItem = {};
            Object.keys(item).forEach((key) => {
              // Trim both the key and the value
              const trimmedKey = key.trim();
              const trimmedValue = item[key]?.trim();
  
              if (trimmedKey && trimmedValue) {
                trimmedItem[trimmedKey] = trimmedValue;
              }
            });
            return trimmedItem;
          }).filter((item) => item.name && item.category); // Filter out any empty rows
  
          setFormData((prevState) => ({
            ...prevState,
            menu: parsedMenu,
          }));
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }
  };
  


console.log('formData',formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await api.post('/api/restaurant', formData, config); 
      setMessage('Restaurant added successfully!');
      setFormData({
        name: '',
        description: '',
        location: '',
        phone: '',
        website: '',
        priceRange: '',
        menu: [],
      });
    } catch (error) {
      console.error(error);
      setMessage('Error adding restaurant. Please try again.');
    }
  };

  // Separate error and form rendering functions
  const errorPage = () => (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Please Sign In to add a restaurant</h1>
      <p className="text-sm text-gray-600">You need to be logged in to add a restaurant.</p>
    </div>
  );

  const addRestaurantForm = () => (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add Restaurant</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Restaurant Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Restaurant Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-lg"
            placeholder="Enter restaurant name"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-lg"
            placeholder="Enter description"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-lg"
            placeholder="Enter restaurant location"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-lg"
            placeholder="Enter phone number"
          />
        </div>

        {/* Website */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Website (Optional)</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-lg"
            placeholder="Enter website URL"
          />
        </div>

        {/* Price Range */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Price Range</label>
          <select
            name="priceRange"
            value={formData.priceRange}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-lg"
          >
            <option value="">Select price range</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
          </select>
        </div>

        {/* Menu CSV Upload */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Upload Menu (CSV)</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            required
            className="mt-1 p-2 w-full border rounded-lg"
          />
          <p className="text-sm text-gray-500 mt-1">Upload a CSV file with "name, category" fields for the menu.</p>
          {csvUploadStatus && <p className="text-sm text-green-500 mt-1">{csvUploadStatus}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"
        >
          Add Restaurant
        </button>

        {/* Success/Error Message */}
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </form>
    </div>
  );

  // Render based on authentication
  return !localStorage.getItem('token') ? errorPage() : addRestaurantForm();
};

export default AddRestaurantForm;
