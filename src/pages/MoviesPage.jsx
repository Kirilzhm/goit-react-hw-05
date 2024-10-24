import styles from "./MoviesPage.module.css"
import { useState, useEffect } from "react";
import apiMovies from "../api-movies";
import MovieList from "../components/MovieList";
import { useSearchParams } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
  
    useEffect(() => {
      if (query) {
        const fetchMovies = async () => {
            setLoading(true);
          try {
            const searchResults = await apiMovies.searchMovies(query);
            setMovies(searchResults);
          } catch (error) {
            console.error('Error fetching search results:', error);
          }
          finally {
            setLoading(false);
          }
        };
  
        fetchMovies();
      }
    }, [query]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
      const searchQuery = form.elements.query.value;
  
      if (searchQuery.trim()) {
        setSearchParams({ query: searchQuery });
      } else {
        setSearchParams({});
      }
    };
  
    return (
      <div>
        <h1 className={styles.searchText}>Search Movies</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" name="query" defaultValue={query} className={styles.formInput}/>
          <button type="submit" className={styles.formBtn}>Search</button>
        </form>
  
        {loading && <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
            />}
        {movies.length > 0 && <MovieList movies={movies} />}

        {!loading && query && movies.length === 0 && (
            <p className={styles.noResultsText}>No results</p>
        )}
      </div>
    );
  };

export default MoviesPage;