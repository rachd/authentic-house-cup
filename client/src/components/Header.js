import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="hp-header">
                <Link className="button" to="/house-list">See House Lists</Link>
                <img className="hp-header__logo" src={logo} alt="Authentic House Cup"/>
                <Link className="button" to="/sorting">Choose Your House</Link>
            </div>
        )
    }
}

export default Header;