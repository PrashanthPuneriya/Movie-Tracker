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

    updateNextMovieIdHandler = (nextMovieID) => { }

    render() {
        return (
            <>
                <div className={styles.SearchArea}>
                    <h3>Search for the Movies to Track</h3>
                    <form className={styles.SearchForm} action="" onSubmit={this.movieInputSubmitHandler}>
                        <input type="text" placeholder="Search Movies..." onChange={this.movieInputChangeHandler} />
                        <button value="Submit">Search</button>
                    </form>
                </div>
                <MoviesList moviesList={this.state.moviesList} updateNextMovieIdHandler={this.updateNextMovieIdHandler} />
            </>
        );
    }
}

export default SearchArea;