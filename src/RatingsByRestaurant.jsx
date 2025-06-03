import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RatingsByRestaurant.css'; 

function RatingsByRestaurant() {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [restaurantName, setRestaurantName] = useState('');

    const fetchReviews = () => {
        fetch(`http://localhost:8000/api/restaurants/${id}/ratings`)
            .then(response => response.json())
            .then(data => {
                setReviews(data);
            })
            .catch(error => console.error('Error fetching reviews:', error));
    };

    useEffect(() => {
        fetch(`http://localhost:8000/api/restaurants/${id}`)
        .then(res => res.json())
        .then(data => setRestaurantName(data.name))
        .catch(error => console.error('Error fetching restaurant name:', error));

        fetchReviews();
    }, [id]);

    const handleDelete = (reviewId) => {
        fetch(`http://localhost:8000/api/restaurants/${id}/ratings/${reviewId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                fetchReviews(); 
                
            } else {
                
                console.error('Failed to delete review. Status:', response.status);
                alert('Failed to delete review.'); 
            }
        })
        .catch(error => {
            console.error('Error deleting review:', error);
            alert('Error deleting review.'); 
        });
    };

    if (!restaurantName && reviews.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="reviews-container">
            <h1>{restaurantName || `Restaurant ${id}`}</h1>
            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                <ul className="reviews-list">
                    {reviews.map(review => (
                        <li key={review.id} className="review-item">
                            <div className="review-content">
                                <p className="review-value">Rating: {review.value} / 5</p>
                                {review.description && <p className="review-description">{review.description}</p>}
                                <p className="review-date">Date: {new Date(review.date_rated).toLocaleString()}</p>
                            </div>
                            <button onClick={() => handleDelete(review.id)} className="delete-button">Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RatingsByRestaurant;