import React, { Component } from 'react';
import Counter from './counter.jsx';
import Axios from 'axios';
var request = require('request');

function isUrlImage(url){
    var magic = {
        jpg: 'ffd8ffe0',
        png: '89504e47',
        gif: '47494638'
    };
    var options = {
        method: 'GET',
        url: url,
        encoding: null,
        header :{
            "Access-Control-Allow-Origin": "*"
        }
    };

request(options, function (err, response, body) {
	console.log("Checking image URL");
    if(!err && response.statusCode == 200){
        var magigNumberInBody = body.toString('hex',0,4);
        if (magigNumberInBody == magic.jpg || magigNumberInBody == magic.png ||magigNumberInBody == magic.gif)
            return true;
        return false;
    }
    return false;
});
}

class memes extends Component {
    state = {
        arr: [],
        name: '',
        caption: '',
        url: ''
    }
    constructor(props){
        super(props);
        this.addElement = this.addElement.bind(this);
        this.fetchMemes = this.fetchMemes.bind(this);
    }
    
    updateMemes(){
        if(this.state.arr.length==0)
            this.fetchMemes();
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        const name = this.state.name;
        const url = this.state.url;
  
        if (name==="" || url==="") {
          alert("Invalid Name or URL");
        }
        else if(isUrlImage(url))
            alert('Given meme URL is not a valid image url');
        else
        {
          const data={
              name: this.state.name,
              url: this.state.url,
              caption: this.state.caption
          }
            const localapi = 'http://localhost:8081/memes/';
            const cloudapi = 'http://ec2-54-221-44-66.compute-1.amazonaws.com:8081/memes';
            Axios.post(localapi,data).then(resp=>{
              console.log(resp);
              alert("Your meme has been added successfully.");
          })
          .catch(err=>console.log(err));
          event.preventDefault();
        }
        this.fetchMemes();
    }

    addElement=(newmeme)=>{
        var newarr =[]
        newarr.push({id: newmeme.id, name: newmeme.name, caption: newmeme.caption, url: newmeme.url});
        newarr.push(this.state.arr.map(c => newarr.push(c)));
        this.setState({arr : newarr});
    }
    fetchMemes(){
        const localapi = 'http://localhost:8081/memes/';
        const cloudapi = 'http://ec2-54-221-44-66.compute-1.amazonaws.com:8081/memes';
        Axios.get(localapi).then(resp=>{
            this.setState({arr:resp});
          })
          .catch(err=>console.log(err));
    }

    render() {
        this.updateMemes();
        return (
            <div>
                <div className="m-4">
                <form className="form" onSubmit={this.mySubmitHandler}>
                <div className="form-group row">
                <label className="col-sm-2 col-form-label">Name*</label>
                    <input
                        type='text'
                        name='name'
                        onChange={this.myChangeHandler} />
                </div>
                <div className="form-group row">
                <label className="col-sm-2 col-form-label">Meme caption</label>
                    <input
                        type='text'
                        name='caption'
                        onChange={this.myChangeHandler} />
                </div>
                <div className="form-group row">
                <label className="col-sm-2 col-form-label">URL*</label>
                    <input
                        type='text'
                        name='url'
                        onChange={this.myChangeHandler} />
                </div>
                <div className="form-group row m-2">
                    <input type='submit' className="btn btn-primary m-2"/>
                </div>
                </form>
                <hr/>
                </div>
                {this.state.arr.map(counter =>( 
                    <Counter key={counter.id} counter={counter} /> 
                ))}  
            </div>
        );
    }
}
 
export default memes;
