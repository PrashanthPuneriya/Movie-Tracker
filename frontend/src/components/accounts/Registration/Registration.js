/* eslint-disable no-unused-expressions */
import React from 'react';
import { Redirect } from 'react-router-dom';
import GlobalStateContext from '../../GlobalStateContext.js';
import styles from './Registration.module.css';


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