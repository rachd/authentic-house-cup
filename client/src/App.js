import React, { Component } from 'react';
import './App.css';
import {HOUSES} from './services/houses';
import Header from './components/Header';
import Hourglass from './components/Hourglass';

class App extends Component {
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
    fetch('/api/leaderboard').then(res => res.json()).then(data => this.processData(data.leaderboard));
  }

  processData(data) {
    let houseCounts = [0, 0, 0, 0];
    let total = 0;
    data.map((person) => {
      const house = HOUSES[person.username];
      if (house != undefined) {
        houseCounts[house]+= parseInt(person.count);
        total += parseInt(person.count);
      }
    });
    this.setState({
      houses: houseCounts,
      total: total
    });
  }

  render() {
    let bodyData = <div className="body"><p>loading</p></div>;
    if (this.state.houses != null) {
      bodyData = <div className="body" style={{display: 'flex', justifyContent: 'space-around'}}>
        <Hourglass house="Slytherin" total={this.state.houses[0]} percentage = {this.state.houses[0] / this.state.total}/>
        <Hourglass house="Ravenclaw" total={this.state.houses[1]} percentage = {this.state.houses[1] / this.state.total}/>
        <Hourglass house="Gryffindor" total={this.state.houses[2]} percentage = {this.state.houses[2] / this.state.total}/>
        <Hourglass house="Hufflepuff" total={this.state.houses[3]} percentage = {this.state.houses[3] / this.state.total}/>
      </div>
    }
    return (
      <div className="App">
        <Header/>
          {bodyData}
      </div>
    );
  }
}

export default App;
