import React from 'react';
import './App.css';
import MoviesList from './movies-list/MoviesList';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MoviesList />
      </div>
    );
  }
}

export default App;
