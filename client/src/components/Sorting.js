import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Sorting extends Component {
    constructor(props) {
        super(props);
        this.state = {house: null, username: null};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if(event.target.name == 'house') {
            this.setState({house: parseInt(event.target.value)});
        } else {
            this.setState({username: event.target.value});
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();
        if(this.state.house !== null && this.state.username !== null) {
            axios.post('/api/sorting', this.state).then((res) => {
                window.location.href = '/';
            });
        }
    }
    
    render() {
        return (
            <div style={{textAlign: 'center', padding: '20px 40px', position: 'relative'}}>
                <Link style={{marginBottom: 20}} className="button" to="/">Back to Results</Link>
                <h1>Sorting Hat</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">What is your Slack username?</label>
                    <input style={{margin: '10px 0 40px 0'}} name="username" type="text" onChange={this.handleChange}/>
                    <label htmlFor="house">What is your Hogwarts house?</label>
                    <select defaultValue="default" name="house" onChange={this.handleChange}>
                        <option value="default" disabled>Select Your House</option>
                        <option value="0">Slytherin</option>
                        <option value="1">Ravenclaw</option>
                        <option value="2">Gryffindor</option>
                        <option value="3">Hufflepuff</option>
                    </select>
                    <button style={{display: 'block', margin: '0 auto'}} type="submit" value="Submit">I have chosen a house</button>
                </form>
            </div>
        );
    }
}

export default Sorting;