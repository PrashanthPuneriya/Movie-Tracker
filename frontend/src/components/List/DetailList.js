import React from 'react';
import { Redirect } from 'react-router-dom';
import GlobalStateContext from '../GlobalStateContext.js';
import styles from './DetailList.module.css';

class DetailList extends React.Component {
    static contextType = GlobalStateContext;
    state = {
        shouldRedirectAfterSuccessfulDelete: false,
        currentListID: null,
        movies: []
    }

    getListDetailsHandler = (currentListID) => {
        let context = this.context;
        let token = context.getTokenFromCookieHandler();
        fetch(`http://localhost:5000/api/my-lists/${currentListID}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ movies: data })
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
    }

    deleteListHandler = (event) => {
        event.preventDefault();
        let context = this.context;
        let token = context.getTokenFromCookieHandler();
        const currentListID = this.state.currentListID;
        fetch(`http://localhost:5000/api/my-lists/${currentListID}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .then(() => {
                this.setState({shouldRedirectAfterSuccessfulDelete: !this.state.shouldRedirectAfterSuccessfulDelete})
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    }

    componentDidMount() {
        const currentListID = this.props.match.params.id;
        this.setState({ currentListID: currentListID, });
        this.getListDetailsHandler(currentListID);
    }

    render() {
        const context = this.context;
        const shouldRedirectAfterSuccessfulDelete = this.state.shouldRedirectAfterSuccessfulDelete;
        if (!context.state.isLoggedIn) {
            return <Redirect to={{ pathname: "/login", message: "You are not logged in!" }} />
        }
        else if (shouldRedirectAfterSuccessfulDelete) {
            return <Redirect to="/profile" />
        }
        else return (
            <div>
                <button className={styles.DeleteButton} onClick={this.deleteListHandler}>Delete this list</button>
                <div className={styles.MoviesList}>
                    {
                        this.state.movies.map((movie) => {
                            return (
                                <h4 key={movie.movie_id}>{movie.movie_title}</h4>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default DetailList;