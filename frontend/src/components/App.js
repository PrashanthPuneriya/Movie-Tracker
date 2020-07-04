import React from 'react';
import Nav from './header/Header';
import SearchArea from './search-area/SearchArea';
import MoviesList from './movies/MoviesList/MoviesList';
import MovieDetail from './movies/MovieDetail/MovieDetail';

import styles from './App.module.css';


class App extends React.Component {
  state = {
    searchTerm: '',
    moviesList: [],
    currentMovie: null
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
        console.log('Data: ', data);
        this.setState({ moviesList: [...data.results] });
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }

  movieDetailViewHandler = (id) => {
    const filteredMovie = this.state.moviesList.filter(movie => movie.id === id);
    const currentNewMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;
    this.setState({ currentMovie: currentNewMovie })

    console.log(currentNewMovie)
  }

  movieDetailCloseHandler = () => {
    this.setState({ currentMovie: null })
  }

  render() {

    return (
      <div className={styles.App}>
        <Nav />
        {
          this.state.currentMovie == null ?
            <div>
              <SearchArea
                movieInputSubmitHandler={this.movieInputSubmitHandler}
                movieInputChangeHandler={this.movieInputChangeHandler}
              />
              <MoviesList moviesList={this.state.moviesList} movieDetailViewHandler={this.movieDetailViewHandler} />
            </div>
            :
            <MovieDetail movie={this.state.currentMovie} movieDetailCloseHandler={this.movieDetailCloseHandler} />
        }

      </div>
    );
  }
}

export default App;
