import React from 'react';

const Movie = (props) => {
    return (
        <div className="Movie">
            <div id="movie-img">
                {
                    props.movie.poster_path === null ?
                        null
                        :
                        <img src={`https://image.tmdb.org/t/p/w154${props.movie.poster_path}`} alt="" />
                }
            </div>
            <div id="movie-title" onClick={ () => props.movieDetailViewHandler(props.movie.id) }>
                <h4>{props.movie.title}</h4>
            </div>
        </div>
    );
}

export default Movie;