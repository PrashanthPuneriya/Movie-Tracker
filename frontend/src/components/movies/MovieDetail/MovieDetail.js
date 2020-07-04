import React from 'react';

const MovieDetail = (props) => {
    return (
        <div className="MovieDetail">
            {/* Add a button here to go back and fire off onClick movieDetailCloseHandler */}
            <button onClick={props.movieDetailCloseHandler}>Go back</button>
            <div id="movie-img">
                {
                    props.movie.poster_path === null ?
                        null
                        :
                        <img src={`https://image.tmdb.org/t/p/w154${props.movie.poster_path}`} alt="" />
                }
            </div>
            <div id="movie-title">
                <h2>{props.movie.title}</h2>
            </div>
            <div id="movie-overview">
                <p>{props.movie.overview}</p>
            </div>
        </div>
    );
}

export default MovieDetail;