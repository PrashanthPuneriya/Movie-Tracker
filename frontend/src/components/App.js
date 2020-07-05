import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './header/Header';
import SearchArea from './search-area/SearchArea';
import MovieDetail from './movies/MovieDetail/MovieDetail';

import styles from './App.module.css';


class App extends React.Component {
  render() {

    return (
      <BrowserRouter>
        <div className={styles.App}>
          <Header />
          <Switch>
            <Route path="/" component={SearchArea} exact />
            <Route path="/movie/:id" component={MovieDetail} exact />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
