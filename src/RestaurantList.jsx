import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import './RestaurantList.css'; // Import your CSS file

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/restaurants/ratings')
      .then(response => response.json())
      .then(data => {
        const formattedRestaurants = data.map(restaurant => ({
          id: restaurant.id,
          imageUrl: '/images/cheese_burger.jpg',
          name: restaurant.name,
          averageRating: restaurant.rating,
          reviewCount: restaurant.review_count,
          cuisine: restaurant.cuisine,
          priceRange: restaurant.price_range,
          address: restaurant.address
        }));
        setRestaurants(formattedRestaurants);
      })
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []); 

  return (
    <div className="restaurant-list-container">
      <div className="side-panel">
        <h3>Actions</h3>
        <button onClick={() => {}}>Add Rating</button>
        {/* Add more action buttons here */}
      </div>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;