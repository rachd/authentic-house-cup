import React, { Component } from 'react';
import ravenclaw from '../assets/images/ravenclaw.jpeg';
import hufflepuff from '../assets/images/Hufflepuff.jpg';
import gryffindor from '../assets/images/gryffindor.jpg';
import slytherin from '../assets/images/slytherin.png';

class Hourglass extends Component {
    render() {
        let color, crest;
        switch(this.props.house) {
            case "Gryffindor":
                color = "#D10917";
                crest = gryffindor;
                break;
            case "Ravenclaw": 
                color = "#084F7E";
                crest = ravenclaw;
                break;
            case "Slytherin":
                color = "#07531A";
                crest = slytherin;
                break;
            case "Hufflepuff":
                color = "#F1B72A";
                crest = hufflepuff;
                break;
        }
        const colorHeight = 400 * this.props.percentage;
        return (
            <div style={{textAlign: 'center'}}>
                <img src={crest} alt={this.props.house} style={{width: 120}}/>
                <div style={{
                    border: '1px solid black',
                    height: 400,
                    width: 150,
                    position: 'relative'
                }}>
                    <div style={{
                        backgroundColor: color, 
                        height: colorHeight, 
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 148
                    }}></div>
                </div>
                <p>{(this.props.percentage * 100).toFixed(3)}%</p>
            </div>
        )
    }
}

export default Hourglass;