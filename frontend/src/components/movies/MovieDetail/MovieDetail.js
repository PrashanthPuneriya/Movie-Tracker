import React from 'react';
import styles from './MovieDetail.module.css';

import MoviesList from '../MoviesList/MoviesList.js';


class MovieDetail extends React.Component {

    state = {
        moviesList: [],
    };

    getRecommendedMoviesHandler = (currentmovieID) => {
        const apiKey = process.env.REACT_APP_API_KEY;
        fetch(`https://api.themoviedb.org/3/movie/${currentmovieID}/recommendations?api_key=${apiKey}`)
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

    render() {
        return (
            <div className={styles.MovieDetails}>
                <button onClick={this.props.movieDetailCloseHandler}>Go back</button>

                <div className={styles["movie-title"]}>
                    <h1>{this.props.movie.title}</h1>
                </div>

                <div className={styles["movie-details"]}>
                    <div className={styles["movie-img"]}>
                        {
                            this.props.movie.poster_path === null ?
                                null
                                :
                                <img src={`https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`} alt="" />
                        }
                    </div>
                    <div className={styles["movie-overview"]}>
                        <h2>Overview</h2>
                        <p>{this.props.movie.overview}</p>
                    </div>
                </div>

                <div className={styles["movie-recommender"]}>
                    <h2>Recommended Movies</h2>
                    <button onClick={() => this.getRecommendedMoviesHandler(this.props.movie.id)}>Get Recommended Movies</button>
                    <MoviesList moviesList={this.state.moviesList} movieDetailViewHandler={this.props.movieDetailViewHandler}/>
                </div>
            </div>
        );
    }
}

export default MovieDetail;