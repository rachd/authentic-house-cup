import React, { Component } from 'react';
import logo from '../assets/images/logo.png';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="hp-header">
                <img className="hp-header__logo" src={logo} alt="Authentic House Cup"/>
            </div>
        )
    }
}

export default Header;