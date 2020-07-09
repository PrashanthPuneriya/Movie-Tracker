/* eslint-disable no-unused-expressions */
import React from 'react';
import { Redirect } from 'react-router-dom';
import GlobalStateContext from '../../GlobalStateContext.js';


class Registration extends React.Component {
    static contextType = GlobalStateContext;
    state = {
        message: null,
    }

    submitUserCredentialsHandler = (event) => {
        event.preventDefault();
        const context = this.context;
        let formData = new FormData(event.target);
        let object = {};
        formData.forEach((value, key) => { object[key] = value });
        fetch(`http://localhost:5000/api/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
        })
            .then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then((object) => {
                const data = object.body
                if (object.status === 201) {
                    document.cookie = data['token']
                    context.changeLoggedInStatusHandler();
                }
                else {
                    this.setState({ message: data['message'] })
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    render() {
        let message = this.state.message;
        const context = this.context;
        if (context.state.isLoggedIn) {
            return <Redirect to="/profile" />
        }
        else return (
            <div>
                {
                    message !== null ?
                        <h3>{message}</h3>
                        :
                        null
                }
                <h1>Registration Page</h1>
                <form className="RegistrationForm" onSubmit={this.submitUserCredentialsHandler}>
                    <label>
                        First Name:
                        <input type="text" name="first_name" placeholder="First Name" required />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" name="last_name" placeholder="Last Name" />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" placeholder="Email" required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" placeholder="Password" required />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Registration;