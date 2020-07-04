import React from 'react';
import './App.css';
import MoviesList from './movies-list/MoviesList';
import Nav from './nav-bar/Nav';


class App extends React.Component {
  state = {
    searchTerm: '',
    moviesList: []
  };

  apiKey = process.env.REACT_APP_API_KEY

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

  render() {
    return (
      <div className="App">
        <Nav />
        <SearchArea
          movieInputSubmitHandler={this.movieInputSubmitHandler}
          movieInputChangeHandler={this.movieInputChangeHandler}
        />
        <MoviesList />
      </div>
    );
  }
}

export default App;
