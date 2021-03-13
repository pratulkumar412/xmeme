import React, { Component } from 'react';
import Axios from 'axios';

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        caption: '',
        url: ''
      };
    }
    mySubmitHandler = (event) => {
      event.preventDefault();
      const name = this.state.name;
      const url = this.state.url;

      if (name==="" || url==="") {
        alert("Invalid...");
      }
      else
      {
        //alert("Submitted...");
        const data={
            name: this.state.name,
            url: this.state.url,
            caption: this.state.caption
        }
        console.log(data);
        
        Axios.post('http://localhost:8081/memes/',data).then(resp=>{
            console.log(resp);
        })
        .catch(err=>console.log(err));
        event.preventDefault();
      }
    }
    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    }
    render() {
      return (
        <form onSubmit={this.mySubmitHandler}>
            <h1>Hello {this.state.name} {this.state.caption}</h1>
            <p>Enter your name :</p>
            <input
                type='text'
                name='name'
                onChange={this.myChangeHandler} />

            <p>Meme caption :</p>
            <input
                type='text'
                name='caption'
                onChange={this.myChangeHandler} />
            <p>URL :</p>
            <input
                type='text'
                name='url'
                onChange={this.myChangeHandler} />
            <br/>
            <br/>
            <input type='submit' />
        </form>
      );
    }
}

export default Form;