import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Roster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        }
    }
    componentDidMount() {
        fetch('/api/sorting').then(res => res.json()).then(data => {
            let list = data;
            Object.keys(list).map(entry => {
                switch(list[entry]) {
                    case '0': list[entry] = 'Slytherin'; break;
                    case '1': list[entry] = 'Ravenclaw'; break;
                    case '2': list[entry] = 'Gryffindor'; break;
                    case '3': list[entry] = 'Hufflepuff'; break;
                }
            })
            this.setState({list: data})
        });
    }

    render() {
        if(this.state.list) {
            return (
                <div style={{textAlign: 'center', padding: '20px 0'}}>
                    <Link style={{marginBottom: 20}} className="button" to="/">Back to Results</Link>
                    <table style={{margin: '0 auto'}}>
                        <tbody>
                            <tr style={{fontSize: 20, fontWeight: 'bold'}}><td>Username</td><td>House</td></tr>
                            {Object.keys(this.state.list).map(user => <tr key={user}><td>{user}</td><td>{this.state.list[user]}</td></tr>)}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (<div style={{textAlign: 'center'}}><p>Fetching list of witches and wizards...</p></div>);
        }
    }
}

export default Roster;