import React from 'react';
//引入antd UI组件
import {DatePicker} from 'antd';
//引入router
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
// import Counter from './Counter';
//引入css文件
import styles from './BasicExample-m.css';
import AsyncLoader from "./AsyncLoader";

import config from '../config/index.js';

export default class BasicExample extends React.Component{
  render (){
    return (
      <Router basename={config.publicPath}>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
            <li>
              <Link to="/counter">Counter</Link>
            </li>
          </ul>

          <hr/>

          <Route exact={true} path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>
          <Route path="/counter" render={() => <AsyncLoader path="Counter.js"/>}/>
        </div>
      </Router>);
    }
  }

const Home = () => (
  <div>
    <h2>Home</h2>
    <DatePicker />
    <p className={styles.red}>Red Text</p>
  </div>
)

const About = () => (<div>
  <h2>About</h2>
  <button>button</button>
  <Link to={{
      pathname: "/somewhere",
      query: {
        subPath: 'subPath'
      }
    }} replace={true}>参数</Link>
  <ul>
    <ListItemLink to="/somewhere"/>
    <ListItemLink to="/somewhere-ele"/>
  </ul>
</div>)

const ListItemLink = ({to,...rest}) => (
  console.log(rest),
  <Route path={to} children={({match}) => (
    console.log("match", match),
      <li className={match
        ? 'active'
        : ''}>
        <Link to={to} {...rest}>{to}</Link>
      </li>)}/>
    )

const Topics = ({match}) => (
  console.log("TOPICS", match),
   <div>
     <h2>Topics</h2>
     <ul>
       <li>
         <Link to={`${match.url}/rendering`}>Rendering with React</Link>
       </li>
       <li>
         <Link to={`${match.url}/components`}>Component</Link>
       </li>
       <li>
         <Link to={`${match.url}/props-v-state`}>Pros v. State</Link>
       </li>
     </ul>

     <Route path={`${match.url}/:topicId`} component={Topic}/>
     <Route exact={true} path={match.url} render={() => (<h3>Please select a topic.</h3>)}/>
   </div>
 )

const Topic = ({match}) => (
  console.log("TOPIC", match),
   <div>
     <h3>{match.params.topicId}</h3>
   </div>
 )
