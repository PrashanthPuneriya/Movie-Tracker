import React from 'react';
import Movie from '../Movie';


const MoviesList = (props) => {
    return (
        <div className="MoviesList">
            {
                props.moviesList.map((movie, i) => {
                    return (
                        <Movie
                            key={i}
                            image={movie.poster_path}
                            movieID={movie.id}
                            movieDetailViewHandler={props.movieDetailViewHandler}
                        />
                    )
                })
            }
        </div>
    );
}

export default MoviesList;