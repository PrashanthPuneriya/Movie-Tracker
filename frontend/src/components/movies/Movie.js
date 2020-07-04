import React from 'react';

const Movie = (props) => {
    return (
        <div className="Movie">
            <div id="movie-img"></div>
            <div id="movie-title" onClick={() => { props.movieDetailViewHandler(props.movieID) }}></div>
        </div>
    );
}

export default Movie;