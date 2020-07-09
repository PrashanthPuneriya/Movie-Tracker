import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import GlobalStateContext from '../../GlobalStateContext.js';


class Profile extends React.Component {
    static contextType = GlobalStateContext;
    state = {
        lists: [],
    }
    getMyListsHandler = () => {
        let context = this.context;
        let token = context.getTokenFromCookieHandler();
        fetch(`http://localhost:5000/api/my-lists/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ lists: data }) // Update the lists state to display all the user lists
            })
            .catch((error) => {
                console.error(error);
            })
    }

    addAListHandler = (event) => {
        event.preventDefault();
        let context = this.context;
        let token = context.getTokenFromCookieHandler();
        let formData = new FormData(event.target);
        event.target.reset();
        let object = {};
        formData.forEach((value, key) => { object[key] = value });
        fetch(`http://localhost:5000/api/my-lists/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(object),
        })
            .then((response) => response.json())
            .then((data) => {
                this.getMyListsHandler(); // Fetch the updated lists from the server again
            })
            .catch((error) => {
                console.error(error);
            })
    }

    componentDidMount() {
        this.getMyListsHandler();
    }

    render() {
        const context = this.context;
        if (!context.state.isLoggedIn) {
            return <Redirect to={{ pathname: "/login", message: "You are not logged in!" }} />
        }
        else return (
            <div>
                <h1>Profile Page</h1>
                <form className="AddListForm" onSubmit={this.addAListHandler}>
                    <label>
                        Name of the list:
                        <input type="text" name="list_name" placeholder="Name of the list..." required />
                    </label>
                    <button type="submit">Add</button>
                </form>
                <div className="Lists">
                    {
                        this.state.lists.map((list) => {
                            return (
                                <Link key={list.id} to={`/list/${list.id}`}>
                                    <h4>{list.list_name}</h4>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Profile;