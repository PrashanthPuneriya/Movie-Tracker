import React from 'react';
import styles from './SearchArea.module.css'

const SearchArea = (props) => {
    return (
        <div className={styles.SearchArea}>
            <h3>Search for the Movie to Track</h3>
            <form className={styles['search-form']} action="" onSubmit={props.movieInputSubmitHandler}>
                <input type="text" onChange={props.movieInputChangeHandler} className={styles['movie-input-value']} id="movie-input-value" placeholder="Search Movies..." />
                <button className={styles['search-button']} id="search-button" value="Submit">Search</button>
            </form>
        </div>
    );
}

export default SearchArea;