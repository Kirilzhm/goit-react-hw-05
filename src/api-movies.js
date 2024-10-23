import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTZmOWM3MGRmYWQ3MDBmNTAzOGU3N2VlMThmZGViMyIsIm5iZiI6MTcyOTU5NjQ3Mi44OTg4NDgsInN1YiI6IjY3MTY5MjczNGJmMzdjODgzY2I3MzY2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a0zpqTiK4laZ4PYfh5zs0dxJ4pZAbYyHauYNO8by06U';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
    },
});

const getPopularMovies = async () => {
    try {
        const response = await api.get('/trending/movie/day');
        return response.data.results;
    } catch (error) {
        console.error('Error finding popular movies:', error);
        throw error;
    };
};

const searchMovies = async (query) => {
    try {
        const response = await api.get('/search/movie', {
            params: {
                query,
                include_adult: false,
                language: 'en-US',
                page: 1,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error finding search movies:', error);
        throw error;
    };
};

const getMovieDetails = async (movieId) => {
    try {
        const response = await api.get(`/movie/${movieId}`, {
            params: {
                language: 'en-US',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error finding movie details:', error);
        throw error;
    };
};

const getFullImageUrl = (imagePath) => {
    return `https://image.tmdb.org/t/p/w500${imagePath}`;
};

const getMovieCast = async (movieId) => {
    try {
        const response = await api.get(`/movie/${movieId}/credits`, {
            params: {
                language: 'en-US',
            },
        });
        return response.data.cast;
    } catch (error) {
        console.error('Error fetching movie cast:', error);
        throw error;

    };
};

const getMovieReviews = async (movieId) => {
    try {
        const response = await api.get(`/movie/${movieId}/reviews`, {
            params: {
                language: 'en-US',
                page: 1,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movie reviews:', error);
        throw error;
    }
}

export default {
    getPopularMovies,
    searchMovies,
    getMovieDetails,
    getFullImageUrl,
    getMovieCast,
    getMovieReviews,
};