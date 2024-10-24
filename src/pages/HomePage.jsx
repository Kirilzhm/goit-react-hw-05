import apiMovies from "../api-movies";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import styles from "./HomePage.module.css"

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const popularMovies = await apiMovies.getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                console.error('Error fetching popular movies', error);
            };
        };
        fetchPopularMovies();
    }, []);

    return(
        <div>
            <h1 className={styles.searchText}>Trending today</h1>
            <MovieList movies={movies}/>
        </div>
    );
};

export default HomePage;