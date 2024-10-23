import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiMovies from "../api-movies";

const MovieCast = () => {
    const {movieId} = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
        async function fetchCast() {
            try {
                const castData = await apiMovies.getMovieCast(movieId);
                setCast(castData);
            } catch (error) {
                console.error("Error fetching cast:", error);
            }
        }
        fetchCast()
    }, [movieId]);

    if (cast.length === 0) {
        return <p>No cast information available</p>
    }
    return (
        <div>
            <ul>
                {cast.map(actor => (
                    <li key={actor.cast_id}>
                        <img 
                        src={apiMovies.getFullImageUrl(actor.profile_path)} 
                        alt={actor.name}
                        width={100}
                        height={150}
                        />
                        <p>{actor.name}</p>
                        <p>Character: {actor.character}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieCast;