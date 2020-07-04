import React from 'react';

const SearchArea = (props) => {
    return (
        <div className="SearchArea">
            <h3>Search for the Movie to be Added</h3>
            <form className="search-form" action="" onSubmit={props.movieInputSubmitHandler}>
                <input type="text" onChange={props.movieInputChangeHandler} className="movie-input-value" id="movie-input-value" placeholder="Search Movies..." />
                <button className="search-button" id="search-button" value="Submit">Search</button>
            </form>
        </div>
    );
}

export default SearchArea;