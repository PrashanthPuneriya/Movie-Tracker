import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Movie.module.css';


const Movie = (props) => {
    return (
        <div className={styles.Movie}>
            <div className={styles["movie-img"]}>
                {
                    props.movie.poster_path === null ?
                        null
                        :
                        <img src={`https://image.tmdb.org/t/p/w300${props.movie.poster_path}`} alt="" />
                }
            </div>
            <Link to={`/movie/${props.movie.id}`} className={styles["movie-title"]} onClick={() => props.updateNextMovieIdHandler(props.movie.id)}>
                <p>{props.movie.title}</p>
            </Link>
        </div>
    );
}

export default Movie;