import React from 'react';
import styles from './SearchArea.module.css'
import MoviesList from '../movies/MoviesList/MoviesList';

class SearchArea extends React.Component {
    state = {
        searchTerm: '',
        searchedForSomeMovie: false,
        moviesList: [],
        isLoading: false,
    };

    apiKey = process.env.REACT_APP_API_KEY;

    movieInputChangeHandler = (event) => {
        this.setState({ searchTerm: event.target.value })
    }

    movieInputSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({ searchedForSomeMovie: true, isLoading: true })
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
            .then((response) => response.json())
            .then((data) => {
                let arr = data.results;
                arr = arr.sort((a, b) => b.popularity-a.popularity)
                arr = arr.filter((movie) => movie.poster_path!==null && !movie.adult)
                this.setState({ moviesList: [...arr], isLoading: false });
            })
            .catch((error) => {
                console.error('Error: ', error);
                this.setState({ isLoading: false });
            });
    }

    getPopularMoviesHandler = () => {
        this.setState({ isLoading: true })
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                let arr = data.results;
                arr = arr.sort((a, b) => b.popularity-a.popularity)
                arr = arr.filter((movie) => movie.poster_path!==null && !movie.adult)
                this.setState({ moviesList: [...arr], isLoading: false });
            })
            .catch((error) => {
                console.error('Error: ', error);
                this.setState({ isLoading: false });
            })
    }

    updateNextMovieIdHandler = (nextMovieID) => { }

    componentDidMount() {
        this.getPopularMoviesHandler();
    }

    render() {
        let isLoading = this.state.isLoading;
        let searchedForSomeMovie = this.state.searchedForSomeMovie;
        let moviesList = this.state.moviesList;
        return (
            <>
                <div className={styles.SearchArea}>
                    <h3>Search for the Movies to Track</h3>
                    <form className={styles.SearchForm} action="" onSubmit={this.movieInputSubmitHandler}>
                        <input type="text" placeholder="Search Movies..." onChange={this.movieInputChangeHandler} />
                        <button value="Submit">Search</button>
                    </form>
                </div>
                {
                    isLoading
                        ?
                        <div className="loader">
                            Loading...
                        </div>
                        :
                        searchedForSomeMovie
                            ?  
                            moviesList.length === 0
                                ?
                                <p>Sorry! No flicks are present with that name. Make sure that flick name is correct</p>
                                :
                                <>
                                <h2>Search Results</h2>
                                    <MoviesList moviesList={this.state.moviesList} updateNextMovieIdHandler={this.updateNextMovieIdHandler} />
                                </>
                            :
                            <>
                                <h2>What's Popular Now?</h2>
                                <MoviesList moviesList={this.state.moviesList} updateNextMovieIdHandler={this.updateNextMovieIdHandler} />
                            </>
                }
            </>
        );
    }
}

export default SearchArea;