import React from 'react';
import MoviesList from '../MoviesList/MoviesList.js';
import GlobalStateContext from '../../GlobalStateContext.js';
import styles from './MovieDetail.module.css';


class MovieDetail extends React.Component {
    static contextType = GlobalStateContext;
    state = {
        movie: null,
        nextMovieID: null,
        recommendedMoviesList: [],
        isLoading: false,
    };

    apiKey = process.env.REACT_APP_API_KEY;

    getMovieDetailsHandler = (currentMovieID) => {
        this.setState({ isLoading: true })
        fetch(`https://api.themoviedb.org/3/movie/${currentMovieID}?api_key=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ movie: data, isLoading: false })
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    }

    getRecommendedMoviesHandler = (currentMovieID) => {
        fetch(`https://api.themoviedb.org/3/movie/${currentMovieID}/recommendations?api_key=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ recommendedMoviesList: [...data.results] });
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    }

    addMovieToMyListHandler = (list_id) => {
        let context = this.context;
        let token = context.getTokenFromCookieHandler();
        let object = { 'movie_id': this.state.movie.id, 'movie_title': this.state.movie.title }
        fetch(`http://localhost:5000/api/my-lists/${list_id}/movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(object),
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        const currentMovieID = this.props.match.params.id;
        let context = this.context;
        this.getMovieDetailsHandler(currentMovieID);
        this.getRecommendedMoviesHandler(currentMovieID);
        context.getMyListsHandler();
    }

    updateNextMovieIdHandler = (nextMovieID) => {
        this.getMovieDetailsHandler(nextMovieID);
        this.getRecommendedMoviesHandler(nextMovieID);
        window.scrollTo(0, 0);
    }

    render() {
        const context = this.context;
        const isLoading = this.state.isLoading;
        let movie = this.state.movie
        return (
            isLoading ?
                <div className="loader">
                    Loading...
                </div>
                :
                movie != null
                    ?
                    <div className={styles.MovieDetails}>

                        <div className="movie-title">
                            <h1>{movie.title}</h1>
                        </div>

                        <div className={styles["movie-details"]}>
                            <div className={styles["movie-img"]}>
                                {
                                    movie.poster_path === null ?
                                        null
                                        :
                                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                                }
                            </div>
                            <div className={styles["movie-overview"]}>
                                <h2>Overview</h2>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                        {
                            // User's Lists
                            context.state.isLoggedIn
                                ?
                                <>
                                    <h1>Add this movie to your List</h1>
                                    <div className={styles.UserLists}>
                                        {
                                            context.state.userLists.map((list) => {
                                                return (
                                                    <button className={styles.AddMovieToListButton} key={list.id} onClick={() => this.addMovieToMyListHandler(list.id)}>{list.list_name}</button>
                                                );
                                            })
                                        }
                                    </div>
                                </>
                                :
                                null
                        }
                        {/* Recommended Movies */}
                        <div className={styles["movie-recommender"]}>
                            <h1>Recommended Movies</h1>
                            <MoviesList moviesList={this.state.recommendedMoviesList} updateNextMovieIdHandler={this.updateNextMovieIdHandler} />
                        </div>
                    </div>
                    :
                    null
        );
    }
}

export default MovieDetail;