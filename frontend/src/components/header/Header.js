import React from 'react';
import styles from './Header.module.css';


class Nav extends React.Component {
    state = {
        close: true,
    }

    toggleNavBarBtn = () => {
        this.setState(
            {
                close: !this.state.close,
            }
        );
        console.log(this.state.close)
        console.log("jsdlf");
    }

    render() {

        return (
            <header>
                <div className={styles.logo}>MovieTracker</div>
                <nav className={styles.navbar}>
                    <div className={styles['toggle-navbar-btn']} onClick={this.toggleNavBarBtn.bind(this)}>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </div>
                    <ul className={
                        this.state.close === true
                            ?
                            styles['navbar-links']
                            :
                            styles['navbar-links active']
                    }>
                        <li><a href="#register">register</a></li>
                        <li><a href="#login">login</a></li>
                        <li><a href="#logout">logout</a></li>
                        <li><a href="#profile">profile</a></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Nav;