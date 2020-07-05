import React from 'react';
import { Link } from 'react-router-dom';
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
    }

    render() {
        const navstyles = [styles['navbar-links']];
        if(this.state.close === true) {
            navstyles.push(styles.active)
        }
        return (
            <header>
                <div className={styles.logo}>MovieTracker</div>
                <nav className={styles.navbar}>
                    <div className={styles['toggle-navbar-btn']} onClick={this.toggleNavBarBtn.bind(this)}>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </div>
                    <ul className={navstyles.join(" ")}>
                        <Link to="/" className={styles.li}>
                            <li>home</li>
                        </Link>
                        <Link to="/register" className={styles.li}>
                            <li>register</li>
                        </Link>
                        <Link to="/login" className={styles.li}>
                            <li>login</li>
                        </Link>
                        <Link to="/logout" className={styles.li}>
                            <li>logout</li>
                        </Link>
                        <Link to="/profile" className={styles.li}>
                            <li>profile</li>
                        </Link>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Nav;