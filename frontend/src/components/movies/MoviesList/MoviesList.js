import React from 'react';
import Movie from '../Movie';

import Styles from './MoviesList.module.css'

const MoviesList = (props) => {
    return (
        <div className={Styles.MoviesList}>
            {
                props.moviesList.map((movie) => {
                    return (
                        <Movie
                            key={movie.id}
                            movie={movie}
                            updateNextMovieIdHandler = {props.updateNextMovieIdHandler}
                        />
                    )
                })
            }
        </div>
    );
}

export default MoviesList;