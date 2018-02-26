import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import ReduxDemo from './components/ReduxDemo';


export default class List extends Component {

  constructor(){
    super();
    console.log(this.props);
    this.state = {

    }
  }

  render(){
    return(
      <div>
        <h2>List</h2>
        <ReduxDemo />
      </div>);
  }
}
