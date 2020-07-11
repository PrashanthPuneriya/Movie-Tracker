import React from 'react';
import { Redirect } from 'react-router-dom';
import GlobalStateContext from '../GlobalStateContext.js';
import styles from './DetailList.module.css';

class DetailList extends React.Component {
    static contextType = GlobalStateContext;
    state = {
        shouldRedirectAfterSuccessfulDelete: false,
        isLoading: false,
        currentListID: null,
        movies: []
    }

    getListDetailsHandler = (currentListID) => {
        let context = this.context;
        this.setState({ isLoading: true })
        let token = context.getTokenFromCookieHandler();
        fetch(`/api/my-lists/${currentListID}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ movies: data })
                this.setState({ isLoading: false })
            })
            .catch((error) => {
                console.log('Error: ', error);
                this.setState({ isLoading: false })
            });
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    deleteListHandler = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true })
        let context = this.context;
        let token = context.getTokenFromCookieHandler();
        const currentListID = this.state.currentListID;
        fetch(`/api/my-lists/${currentListID}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .then(() => {
                this.setState({shouldRedirectAfterSuccessfulDelete: !this.state.shouldRedirectAfterSuccessfulDelete})
                this.setState({ isLoading: false })
            })
            .catch((error) => {
                console.log('Error:', error);
                this.setState({ isLoading: false })
            });
    }

    componentDidMount() {
        const currentListID = this.props.match.params.id;
        this.setState({ currentListID: currentListID, });
        this.getListDetailsHandler(currentListID);
    }

    render() {
        const context = this.context;
        let isLoading = this.state.isLoading;
        const shouldRedirectAfterSuccessfulDelete = this.state.shouldRedirectAfterSuccessfulDelete;
        if (!context.state.isLoggedIn) {
            return <Redirect to={{ pathname: "/login", message: "You are not logged in!" }} />
        }
        else if (isLoading) {
            return <div className="loader">Loading...</div>
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