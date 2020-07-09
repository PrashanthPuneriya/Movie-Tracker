import React from 'react';
import styles from './SearchArea.module.css'
import MoviesList from '../movies/MoviesList/MoviesList';

class SearchArea extends React.Component {
    state = {
        searchTerm: '',
        moviesList: [],
    };

    movieInputChangeHandler = (event) => {
        this.setState({ searchTerm: event.target.value })
    }

    movieInputSubmitHandler = (event) => {
        event.preventDefault();
        const apiKey = process.env.REACT_APP_API_KEY;
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.state.searchTerm}`)
            .then((response) => response.json())
            .then((data) => {
                // 'data' is an object.
                // 'results' is an array of objects which consists each movie details
                this.setState({ moviesList: [...data.results] });
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    }

    updateNextMovieIdHandler = (nextMovieID) => {}

    render() {
        return (
            <div>
                <div className={styles.SearchArea}>
                    <p>Search for the Movies to Track</p>
                    <form className={styles['search-form']} action="" onSubmit={this.movieInputSubmitHandler}>
                        <input type="text" onChange={this.movieInputChangeHandler} className={styles['movie-input-field']} id="movie-input-value" placeholder="Search Movies..." />
                        <button className={styles['search-btn']} value="Submit">Search</button>
                    </form>
                </div>
                <MoviesList moviesList={this.state.moviesList} updateNextMovieIdHandler={this.updateNextMovieIdHandler}/>
            </div>
        );
    }
}

export default SearchArea;