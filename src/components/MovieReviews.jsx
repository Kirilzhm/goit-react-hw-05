import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiMovies from "../api-movies";

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const reviewData = await apiMovies.getMovieReviews(movieId);
                setReviews(reviewData);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        }
        fetchReviews();
    }, [movieId]);

    if (!reviews.length) {
        return <p>No reviews available</p>;
    }

    return (
        <ul>
            {reviews.map(review => (
                <li key={review.id}>
                    <h4>{review.author}</h4>
                    <p>{review.content}</p>
                </li>
            ))}
        </ul>
    );
};

export default MovieReviews;
