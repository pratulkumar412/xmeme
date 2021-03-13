import React, { Component } from 'react';

// Component that displays a particular meme
class Counter extends Component {
    state = {
        id: this.props.counter.id,
        name: this.props.counter.name,
        caption: this.props.counter.caption,
        url: this.props.counter.url
    }
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div className="">
                <p className="m-4 font-weight-bold">{this.props.counter.name}</p>
                <span className="m-5">{this.props.counter.caption}</span><br/>
                <img src={this.props.counter.url} className="img-thumbnail m-5 max-height: 100% height:200px"></img>
                <hr/>
            </div>
        );
    }
}
 
export default Counter;