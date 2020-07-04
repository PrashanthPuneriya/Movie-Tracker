import React from 'react';
import styles from './MovieDetail.module.css'

const MovieDetail = (props) => {
    return (
        <div className={styles.MovieDetails}>

            {/* Add a button here to go back and fire off onClick movieDetailCloseHandler */}
            <button onClick={props.movieDetailCloseHandler}>Go back</button>

            <div className={styles["movie-title"]}>
                <h1>{props.movie.title}</h1>
            </div>

            <div className={styles["movie-details"]}>
                <div className={styles["movie-img"]}>
                    {
                        props.movie.poster_path === null ?
                            null
                            :
                            <img src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} alt="" />
                    }
                </div>
                <div className={styles["movie-overview"]}>
                    <h2>Overview</h2>
                    <p>{props.movie.overview}</p>
                </div>
            </div>

        </div>
    );
}

export default MovieDetail;