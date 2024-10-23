import { useParams, Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import apiMovies from "../api-movies";
import { MagnifyingGlass } from "react-loader-spinner";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    
    const previousLocation = location.state?.from || "/movies";

    useEffect(() => {
        async function fetchData() {
            try {
                const movieData = await apiMovies.getMovieDetails(movieId);
                setMovie(movieData);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        }
        fetchData();
    }, [movieId]);

    if (!movie) {
        return (
            <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
            />
        );
    }

    const posterUrl = apiMovies.getFullImageUrl(movie.poster_path);

    return (
        <div>
            <button onClick={() => navigate(previousLocation)} className={styles.goBackButton}>
                Go Back
            </button>
            <div style={{ display: 'flex' }}>
                <img
                    className={styles.moviePoster}
                    src={posterUrl}
                    alt={movie.title}
                    width={300}
                />
                <div className={styles.movieDetailsBox}>
                    <h2>
                        {movie.title} ({new Date(movie.release_date).getFullYear()})
                    </h2>

                    <p>User score: {movie.vote_average}</p>

                    <h3>Overview</h3>
                    <p>{movie.overview}</p>

                    <h3>Genres</h3>
                    <p>{movie.genres.map(genre => genre.name).join(", ")}</p>
                </div>
            </div>
            <div>
                <Link to="cast" className={styles.castLink} state={{ from: previousLocation }}>Cast</Link>
                <Link to="reviews" className={styles.reviewLink} state={{ from: previousLocation }}>Reviews</Link>
            </div>
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;
