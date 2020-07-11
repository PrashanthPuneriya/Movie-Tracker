import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import GlobalStateContext from '../../GlobalStateContext.js';
import styles from './Profile.module.css';


class Profile extends React.Component {
    static contextType = GlobalStateContext;

    state = {
        areListsLoading: false,
    }

    createListHandler = (event) => {
        event.preventDefault();
        this.setState({ areListsLoading: true })
        let context = this.context;
        let token = context.getTokenFromCookieHandler();
        let formData = new FormData(event.target);
        event.target.reset();
        let object = {};
        formData.forEach((value, key) => { object[key] = value });
        fetch(`/api/my-lists/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(object),
        })
            .then((response) => response.json())
            .then((data) => {
                context.getMyListsHandler(); // Fetch the updated lists from the server again
                this.setState({ areListsLoading: false })
            })
            .catch((error) => {
                console.error(error);
                this.setState({ areListsLoading: false })
            })
    }

    componentDidMount() {
        const context = this.context;
        context.getMyListsHandler();
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        const context = this.context;
        let areListsLoading = this.state.areListsLoading;
        if (!context.state.isLoggedIn) {
            return <Redirect to={{ pathname: "/login", message: "You are not logged in!" }} />
        }
        else return (
            <div>
                <div className={styles.CreateListArea}>
                    <h2>Create a list</h2>
                    <form className={styles.AddListForm} onSubmit={this.createListHandler}>
                        <input type="text" name="list_name" placeholder="Name of the list..." required />
                        <button type="submit">Add</button>
                    </form>
                </div>
                <div className={styles.DisplayListArea}>
                    <h2>Your lists</h2>
                    {
                        areListsLoading
                            ?
                            <div className="loader">Loading...</div>
                            :
                            <div className={styles.Lists}>
                                {
                                    context.state.userLists.length === 0
                                        ?
                                        <p>Your have no lists...</p>
                                        :
                                        context.state.userLists.map((list) => {
                                            return (
                                                <Link style={{ textDecoration: 'none' }} key={list.id} to={`/list/${list.id}`}>
                                                    <p className={styles.ListName}>{list.list_name}</p>
                                                </Link>
                                            );
                                        })
                                }
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default Profile;