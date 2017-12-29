import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="hp-header">
                <button><Link to="/house-list">See House Lists</Link></button>
                <img className="hp-header__logo" src={logo} alt="Authentic House Cup"/>
                <button><Link to="/sorting">Choose Your House</Link></button>
            </div>
        )
    }
}

export default Header;