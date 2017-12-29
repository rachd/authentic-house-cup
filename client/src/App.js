import React, { Component } from 'react';
import './App.css';
import {HOUSES} from './services/houses';
import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: null
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
    data.map((person) => {
      const house = HOUSES[person.username];
      if (house != undefined) {
        houseCounts[house]+= parseInt(person.count);
      }
    });
    this.setState({houses: houseCounts});
  }

  render() {
    let bodyData = <div className="body"><p>loading</p></div>;
    if (this.state.houses != null) {
      bodyData = <div className="body">
        <p>Slytherin: {this.state.houses[0]}</p>
        <p>Ravenclaw: {this.state.houses[1]}</p>
        <p>Gryffindor: {this.state.houses[2]}</p>
        <p>Hufflepuff: {this.state.houses[3]}</p>
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
