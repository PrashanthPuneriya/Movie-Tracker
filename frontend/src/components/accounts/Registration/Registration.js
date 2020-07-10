/* eslint-disable no-unused-expressions */
import React from 'react';
import { Redirect } from 'react-router-dom';
import GlobalStateContext from '../../GlobalStateContext.js';
import styles from './Registration.module.css';


class Registration extends React.Component {
    static contextType = GlobalStateContext;
    state = {
        message: null,
        isLoading: false,
    }

    // Sets JWT token as cookie
    submitUserCredentialsHandler = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true })
        const context = this.context;
        let formData = new FormData(event.target);
        let object = {};
        formData.forEach((value, key) => { object[key] = value });
        fetch(`/api/register/`, {
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
                this.setState({ isLoading: false })
            })
            .catch((error) => {
                console.error(error);
                this.setState({ message: "Something went wrong with our server. Please try again later at some other time"})
                this.setState({ isLoading: false })
            })
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        let message = this.state.message;
        let isLoading = this.state.isLoading;

        const context = this.context;
        if (context.state.isLoggedIn) {
            return <Redirect to="/profile" />
        }
        else if (isLoading) {
            return <div className="loader">Loading...</div>
        }
        else return (
            <div className={styles.Registration}>
                <h1 className={styles.title}>Registration</h1>
                {
                    message !== null ?
                        <h4 className={styles.message}>{message}</h4>
                        :
                        null
                }
                <form className={styles.RegistrationForm} onSubmit={this.submitUserCredentialsHandler}>
                    <input type="text" name="first_name" placeholder="First Name" required />
                    <input type="text" name="last_name" placeholder="Last Name" />
                    <input type="email" name="email" placeholder="Email" required />
                    <input type="password" name="password" placeholder="Password" required />
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default Registration;