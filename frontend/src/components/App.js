import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './header/Header';
import SearchArea from './search-area/SearchArea';
import MovieDetail from './movies/MovieDetail/MovieDetail';
import Registration from './accounts/Registration/Registration';
import Login from './accounts/Login/Login';
import Profile from './accounts/Profile/Profile';
import ListDetails from './accounts/UserLists/ListDetails';

import GlobalStateContext from './GlobalStateContext.js';


class App extends React.Component {
  state = {
    isLoggedIn: false,
    userLists: [],
  }

  changeLoggedInStatusHandler = () => {
    this.setState((prevState) => ({ isLoggedIn: !prevState.isLoggedIn }))
  }

  getTokenFromCookieHandler = () => {
    // Split cookie string and get all individual name=value pairs in an array
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
      // Remove whitespaces from the beginning of the cookie name
      if (cookiePair[0].trim() === "token") {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }

  deleteTokenFromCookieHandler = () => {
    document.cookie = "token=; max-age=0";
    this.changeLoggedInStatusHandler();
  }

  getMyListsHandler = () => {
    let token = this.getTokenFromCookieHandler();
    fetch(`/api/my-lists/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ userLists: data }) // Update the lists state to display all the user lists
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    return (
      <GlobalStateContext.Provider
        value={{
          state: this.state,
          changeLoggedInStatusHandler: this.changeLoggedInStatusHandler,
          getTokenFromCookieHandler: this.getTokenFromCookieHandler,
          deleteTokenFromCookieHandler: this.deleteTokenFromCookieHandler,
          getMyListsHandler: this.getMyListsHandler,
        }}
      >
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" component={SearchArea} exact />
            <Route path="/movie/:id" component={MovieDetail} exact />
            <Route path="/register" component={Registration} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/profile" component={Profile} exact />
            <Route path="/list/:id" component={ListDetails} exact />
          </Switch>
        </BrowserRouter>
      </GlobalStateContext.Provider>
    );
  }
}

export default App;