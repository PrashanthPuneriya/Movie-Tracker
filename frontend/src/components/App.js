import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './header/Header';
// Movie
import SearchArea from './search-area/SearchArea';
import MovieDetail from './movies/MovieDetail/MovieDetail';
// Accounts
import Registration from './accounts/Registration/Registration';
import Login from './accounts/Login/Login';
import Profile from './accounts/Profile/Profile';

import styles from './App.module.css';
import DetailList from './List/DetailList';


class App extends React.Component {
  render() {

    return (
      <BrowserRouter>
        <div className={styles.App}>
          <Header />
          <Switch>
            <Route path="/" component={SearchArea} exact />
            <Route path="/movie/:id" component={MovieDetail} exact />

            <Route path="/register" component={Registration} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/profile" component={Profile} exact />
            <Route path="/list/:id" component={DetailList} exact />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
