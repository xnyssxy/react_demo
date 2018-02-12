import React from 'react';//必须要引，如果不引会报错，推测是因为后面的引入需要依赖React
import ReactDOM from 'react-dom';
//引入antd UI组件,BasicExample组件提出去之后就不用了
// import {DatePicker} from 'antd';
// import 'antd/dist/antd.css';//webpack.config.js配置了按需加载插件，这个地方就不用了

//引入router,BasicExample组件提出去之后就不用了
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import {AppContainer} from 'react-hot-loader';
//BasicExample组件提出去之后就不用了
// import Counter from './Counter';
import BasicExample from './BasicExample';

/**未引入路由
 * webpack.config.js未配置Babel时
 * 直接用react
 * @type {[type]}
 */
// var e = React.createElement('p',null,'This is React Demo');
// ReactDOM.render(e, document.getElementById('main'));

//配置了Babel后
// class Text extends React.Component {
//     多于一个标签的时候，不能直接render，需要有一个div包起来
//     render() {
//         return (
//           <div>
//             <p> This is a React Component </p>
//             <DatePicker />
//           </div>
//         );
//     }
// }
//
// ReactDOM.render(<Text/>,document.getElementById('main'));

// const BasicExample = () => (<Router>
//   <div>
//     <ul>
//       <li>
//         <Link to="/">Home</Link>
//       </li>
//       <li>
//         <Link to="/about">About</Link>
//       </li>
//       <li>
//         <Link to="/topics">Topics</Link>
//       </li>
//       <li>
//         <Link to="/counter">Counter</Link>
//       </li>
//     </ul>
//
//     <hr/>
//
//     <Route exact={true} path="/" component={Home}/>
//     <Route path="/about" component={About}/>
//     <Route path="/topics" component={Topics}/>
//     <Route path="/counter" component={Counter}/>
//   </div>
// </Router>)
//
// const Home = () => (<div>
//   <h2>Home</h2>
// </div>)
//
// const About = () => (<div>
//   <h2>About</h2>
//   <button>button</button>
//   <Link to={{
//       pathname: "/somewhere",
//       query: {
//         subPath: 'subPath'
//       }
//     }} replace={true}>参数</Link>
//   <ul>
//     <ListItemLink to="/somewhere"/>
//     <ListItemLink to="/somewhere-ele"/>
//   </ul>
// </div>)
//
// const ListItemLink = ({to,...rest}) => (
//   console.log(rest),
//   <Route path={to} children={({match}) => (
//     console.log("match", match),
//       <li className={match
//         ? 'active'
//         : ''}>
//         <Link to={to} {...rest}>{to}</Link>
//       </li>)}/>
//     )
//
// const Topics = ({match}) => (console.log("TOPICS", match), <div>
//   <h2>Topics</h2>
//   <ul>
//     <li>
//       <Link to={`${match.url}/rendering`}>Rendering with React</Link>
//     </li>
//     <li>
//       <Link to={`${match.url}/components`}>Component</Link>
//     </li>
//     <li>
//       <Link to={`${match.url}/props-v-state`}>Pros v. State</Link>
//     </li>
//   </ul>
//
//   <Route path={`${match.url}/:topicId`} component={Topic}/>
//   <Route exact={true} path={match.url} render={() => (<h3>Please select a topic.</h3>)}/>
// </div>)
//
// const Topic = ({match}) => (console.log("TOPIC", match), <div>
//   <h3>{match.params.topicId}</h3>
// </div>)


//添加react-hot-loader 后就不用了
// ReactDOM.render(
//   <BasicExample/>,
//    document.getElementById('main')
//  );

//当没有把BasicExample组件提出去时，COUNT_STEP变化时，发生热更新，
//组件状态会被重置，所以要提出去
ReactDOM.render(
  <AppContainer>
    <BasicExample/>
  </AppContainer>,
  document.getElementById('main')
);

// import $ from 'jquery';
// $('body').append('<p>Hello vendor</p>');

  if (module.hot) {
    module.hot.accept();
  }
