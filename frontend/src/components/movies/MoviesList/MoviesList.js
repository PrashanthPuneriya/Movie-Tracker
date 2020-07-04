import React from 'react';
import Movie from '../Movie';

import Styles from './MoviesList.module.css'

const MoviesList = (props) => {
    return (
        <div className={Styles.MoviesList}>
            {
                props.moviesList.map((movie, i) => {
                    return (
                        <Movie
                            key={i}
                            movie={movie}
                            movieDetailViewHandler={props.movieDetailViewHandler}
                        />
                    )
                })
            }
        </div>
    );
}

export default MoviesList;