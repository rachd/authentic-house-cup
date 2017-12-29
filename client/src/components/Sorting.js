import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Sorting extends Component {
    constructor(props) {
        super(props);
        this.state = {house: null, username: null};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if(event.target.name == 'house') {
            this.setState({house: event.target.value});
        } else {
            this.setState({username: event.target.value});
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();
        if(this.state.house && this.state.username) {
            console.log(this.state);
        }
    }
    
    componentDidMount() {

    }
    
    render() {
        return (
            <div style={{textAlign: 'center', padding: '20px 40px', position: 'relative'}}>
                <button style={{position: 'absolute', top: 40, left: 40}}><Link to="/">Back to Results</Link></button>
                <h1>Sorting Hat</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">What is your Slack username?</label>
                    <select name="username" onChange={this.handleChange}>
                        <option selected disabled>Select Your Username</option>
                        <option>molly</option>
                    </select>
                    <label htmlFor="house">What is your Hogwarts house?</label>
                    <select name="house" onChange={this.handleChange}>
                        <option selected disabled>Select Your House</option>
                        <option>Slytherin</option>
                        <option>Ravenclaw</option>
                        <option>Gryffindor</option>
                        <option>Hufflepuff</option>
                    </select>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default Sorting;