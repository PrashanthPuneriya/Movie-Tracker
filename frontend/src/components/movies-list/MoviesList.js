import React from 'react';
import Nav from '../nav-bar/Nav';
import MoviesFetcher from './MoviesFetcher';

const MoviesList = () => {
    return (
        <div className="HomePage">
            <Nav />
            <MoviesFetcher />
            
        </div>
    );
}

export default MoviesList;