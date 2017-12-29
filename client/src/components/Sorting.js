import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Sorting extends Component {
    constructor(props) {
        super(props);
        this.state = {usernames: null, house: null, username: null};
    
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
        if(this.state.house && this.state.username) {
            axios.post('/api/sorting', this.state).then((res) => console.log(res));
        }
    }
    
    componentDidMount() {
        fetch('/api/usernames').then(res => res.json()).then(data => {
            data.sort();
            this.setState({usernames: data});
        });
    }
    
    render() {
        if(this.state.usernames) {
            return (
                <div style={{textAlign: 'center', padding: '20px 40px', position: 'relative'}}>
                    <button style={{position: 'absolute', top: 40, left: 40}}><Link to="/">Back to Results</Link></button>
                    <h1>Sorting Hat</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="username">What is your Slack username?</label>
                        <select defaultValue="default" name="username" onChange={this.handleChange}>
                            <option value="default" disabled>Select Your Username</option>
                            {this.state.usernames.map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                        <label htmlFor="house">What is your Hogwarts house?</label>
                        <select defaultValue="default" name="house" onChange={this.handleChange}>
                            <option value="default" disabled>Select Your House</option>
                            <option value="0">Slytherin</option>
                            <option value="1">Ravenclaw</option>
                            <option value="2">Gryffindor</option>
                            <option value="3">Hufflepuff</option>
                        </select>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            );
        } else {
            return (<p>Fetching list of witches and wizards</p>);
        }
    }
}

export default Sorting;