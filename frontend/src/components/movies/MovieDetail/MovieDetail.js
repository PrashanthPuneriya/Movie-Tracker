import React from 'react';
import styles from './MovieDetail.module.css';
import MoviesList from '../MoviesList/MoviesList.js';
import GlobalStateContext from '../../GlobalStateContext.js';

class MovieDetail extends React.Component {
    static contextType = GlobalStateContext;
    state = {
        movie: null,
        nextMovieID: null,
        recommendedMoviesList: [],
    };

    apiKey = process.env.REACT_APP_API_KEY;

    getMovieDetailsHandler = (currentMovieID) => {
        fetch(`https://api.themoviedb.org/3/movie/${currentMovieID}?api_key=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ movie: data })
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
        return (
            this.state.movie === null ?
                <div className={styles.MovieDetails}>
                    Loading Movie Details...
                </div>
                :
                <div className={styles.MovieDetails}>

                    <div className="movie-title">
                        <h1>{this.state.movie.title}</h1>
                    </div>

                    <div className={styles["movie-details"]}>
                        <div className={styles["movie-img"]}>
                            {
                                this.state.movie.poster_path === null ?
                                    null
                                    :
                                    <img src={`https://image.tmdb.org/t/p/w500${this.state.movie.poster_path}`} alt="" />
                            }
                        </div>
                        <div className={styles["movie-overview"]}>
                            <h2>Overview</h2>
                            <p>{this.state.movie.overview}</p>
                        </div>
                    </div>
                    {
                        // User's Lists
                        context.state.isLoggedIn
                            ?
                            <div className="Lists">
                                <h1>Add this movie to your List</h1>
                                {
                                    context.state.userLists.map((list) => {
                                        return (
                                            <button key={list.id} onClick={() => this.addMovieToMyListHandler(list.id)}>{list.list_name}</button>
                                        );
                                    })
                                }
                            </div>
                            :
                            null
                    }
                    {/* Recommended Movies */}
                    <div className={styles["movie-recommender"]}>
                        <h1>Recommended Movies</h1>
                        <MoviesList moviesList={this.state.recommendedMoviesList} updateNextMovieIdHandler={this.updateNextMovieIdHandler} />
                    </div>
                </div>
        );
    }
}

export default MovieDetail;