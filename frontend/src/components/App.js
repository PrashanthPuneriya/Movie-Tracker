import React from 'react';
import './App.css';
import Nav from './nav-bar/Nav';
import MoviesList from './movies/MoviesList/MoviesList';
import MovieDetail from './movies/MovieDetail/MovieDetail';


class App extends React.Component {
  state = {
    searchTerm: '',
    moviesList: [],
    currentMovie: null
  };

  apiKey = process.env.REACT_APP_API_KEY;

  movieInputChangeHandler = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  movieInputSubmitHandler = (event) => {
    event.preventDefault();

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
    const filteredMovie = this.state.moviesList.filter(movie => movie.id == id);
    const currentNewMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;
    this.setState({ currentMovie: currentNewMovie })
  }

  movieDetailCloseHandler = () => {
    this.setState({ currentMovie: null })
  }

  render() {

    return (
      <div className="App">
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
            <MovieDetail movieDetailCloseHandler={this.movieDetailCloseHandler} />
        }
      </div>
    );
  }
}

export default App;
