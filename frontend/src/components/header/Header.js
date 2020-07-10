/* eslint-disable no-unused-expressions */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import GlobalStateContext from '../GlobalStateContext.js';


class Header extends React.Component {
    static contextType = GlobalStateContext
    state = {
        close: true,
    }

    toggleNavBarBtn = () => {
        this.setState((prevState) => ({ close: !prevState.close }));
    }

    componentDidUpdate() {
        const context = this.context;
        this.token = context.getTokenFromCookieHandler;
        if (this.token !== null) {
            context.changeLoggedInStatusHandler;
        }
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        const context = this.context;
        const isLoggedIn = context.state.isLoggedIn
        const navstyles = [styles['navbar-links']];
        if (this.state.close !== true) {
            navstyles.push(styles.active)
        }
        return (
            <header>
                <div className={styles.logo}>FlickTracker</div>
                <nav className={styles.navbar}>
                    <div className={styles['toggle-navbar-btn']} onClick={this.toggleNavBarBtn.bind(this)}>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </div>
                    {
                        isLoggedIn ?
                            <ul className={navstyles.join(" ")} onClick={this.toggleNavBarBtn.bind(this)}>
                                <Link to="/" className={styles.li}>
                                    <li>home</li>
                                </Link>
                                <Link to="/profile" className={styles.li}>
                                    <li>profile</li>
                                </Link>
                                <Link to="/login" className={styles.li} onClick={context.deleteTokenFromCookieHandler}>
                                    <li>logout</li>
                                </Link>
                            </ul>
                            :
                            <ul className={navstyles.join(" ")} onClick={this.toggleNavBarBtn.bind(this)}>
                                <Link to="/" className={styles.li}>
                                    <li>home</li>
                                </Link>
                                <Link to="/register" className={styles.li}>
                                    <li>register</li>
                                </Link>
                                <Link to="/login" className={styles.li}>
                                    <li>login</li>
                                </Link>
                            </ul>
                    }
                </nav>
            </header>
        );
    }
}

export default Header;