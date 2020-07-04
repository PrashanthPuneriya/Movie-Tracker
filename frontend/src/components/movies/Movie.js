import React from 'react';
import styles from './Movie.module.css';


const Movie = (props) => {
    return (
        <div className={styles.Movie}>
            <div id={styles["movie-img"]}>
                {
                    props.movie.poster_path === null ?
                        null
                        :
                        <img src={`https://image.tmdb.org/t/p/w300${props.movie.poster_path}`} alt="" />
                }
            </div>
            <div className={styles["movie-title"]} onClick={() => props.movieDetailViewHandler(props.movie.id)}>
                <h4>{props.movie.title}</h4>
            </div>
        </div>
    );
}

export default Movie;