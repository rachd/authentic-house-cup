import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import Hourglass from './Hourglass';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
          houses: null,
          total: 0
        }
    }
    componentDidMount() {
        this.getData();
    }
    
    getData = () => {
        fetch('/api/leaderboard?days=30').then(res => res.json()).then(data => this.processData(data.leaderboard));
    }
    
    processData(data) {
        let houseCounts = [0, 0, 0, 0];
        let total = 0;
        fetch('/api/sorting').then(res => res.json()).then(houses => {
            data.map((person) => {
                const house = houses[person.username];
                if (house != undefined) {
                  houseCounts[house]+= parseInt(person.count);
                  total += parseInt(person.count);
                }
            });
            this.setState({
                houses: houseCounts,
                total: total
            });
        });
    }

    handleChange(event) {
        fetch(`/api/leaderboard?days=${event.target.value}`).then(res => res.json()).then(data => this.processData(data.leaderboard));
    }
    
    render() {
        let bodyData = <div className="body" style={{textAlign: 'center'}}><p>Casting Magic...</p></div>;
        if (this.state.houses != null) {
          bodyData = <div className="body" style={{display: 'flex', justifyContent: 'space-around'}}>
            <form style={{textAlign: 'center'}}>
                <label style={{display: 'inline', marginRight: 10}} htmlFor="days">How many days?</label>
                <select style={{margin: 0}} defaultValue="30" name="days" onChange={this.handleChange}>
                    <option value="7">7</option>
                    <option value="14">14</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="365">365</option>
                    <option value="366">366</option>
                </select>
            </form>
            <Hourglass house="Slytherin" total={this.state.houses[0]} percentage = {this.state.houses[0] / this.state.total}/>
            <Hourglass house="Ravenclaw" total={this.state.houses[1]} percentage = {this.state.houses[1] / this.state.total}/>
            <Hourglass house="Gryffindor" total={this.state.houses[2]} percentage = {this.state.houses[2] / this.state.total}/>
            <Hourglass house="Hufflepuff" total={this.state.houses[3]} percentage = {this.state.houses[3] / this.state.total}/>
          </div>
        }
        return (
          <div className="App" style={{position: 'relative'}}>
            <button style={{
                position: 'absolute',
                left: 40,
                top: 40
            }}><Link to="/house-list">See House Lists</Link></button>
            <button style={{
                position: 'absolute',
                right: 40,
                top: 40
            }}><Link to="/sorting">Choose Your House</Link></button>
            <Header/>
            {bodyData}
          </div>
        );
    }
}

export default Results;