import styles from "./MoviesPage.module.css"
import { useState } from "react";
import apiMovies from "../api-movies";
import MovieList from "../components/MovieList";

const MoviesPage = () => {

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (query.trim() === '') {
            return;
        }
        try {
            const serchResults = await apiMovies.searchMovies(query);
            setMovies(serchResults);
        } catch (error) {
            console.error('Error searching for movies:', error);
            
        }
    }

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input 
                type="text" 
                className={styles.formInput}
                value={query}
                onChange={handleInputChange}/>
                <button 
                type="submit"
                className={styles.formBtn}>Search</button>
            </form>
            <ul>
                {movies.length > 0 ? (<MovieList movies={movies}/>) : (
                    <p className={styles.noResultsText}>No results found</p>
                )}
            </ul>
        </div>
    )
};

export default MoviesPage;