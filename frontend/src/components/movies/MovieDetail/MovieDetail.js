import React from 'react';
import styles from './MovieDetail.module.css';

import MoviesList from '../MoviesList/MoviesList.js';


class MovieDetail extends React.Component {

    state = {
        movie: null,
        nextMovieID: null,
        moviesList: [],
    };

    apiKey = process.env.REACT_APP_API_KEY;

    getMovieDetailsHandler = (currentMovieID) => {
        fetch(`https://api.themoviedb.org/3/movie/${currentMovieID}?api_key=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ movie: data })
                console.log(data)
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
    }

    getRecommendedMoviesHandler = (currentMovieID) => {
        fetch(`https://api.themoviedb.org/3/movie/${currentMovieID}/recommendations?api_key=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                // 'data' is an object.
                // 'results' is an array of objects which consists each movie details
                console.log('Data: ', data);
                this.setState({ moviesList: [...data.results] });
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
    }

    componentDidMount() {
        const currentMovieID = this.props.match.params.id;
        this.getMovieDetailsHandler(currentMovieID)
        this.getRecommendedMoviesHandler(currentMovieID)
    }

    updateNextMovieIdHandler = (nextMovieID) => {
        this.getMovieDetailsHandler(nextMovieID)
        this.getRecommendedMoviesHandler(nextMovieID)
        window.scrollTo(0, 0);
    }

    render() {
        return (
            this.state.movie === null ?
                "Loading Movie Details..."
                :
                <div className={styles.MovieDetails}>

                    <div className={styles["movie-title"]}>
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

                    <div className={styles["movie-recommender"]}>
                        <h2>Recommended Movies</h2>
                        <MoviesList moviesList={this.state.moviesList} updateNextMovieIdHandler={this.updateNextMovieIdHandler}/>
                    </div>
                </div>
        );
    }
}

export default MovieDetail;