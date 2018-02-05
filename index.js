import React from 'react';
import ReactDOM from 'react-dom';
//引入antd UI组件
import {DatePicker} from 'antd';
// import 'antd/dist/antd.css';//webpack.config.js配置了按需加载插件，这个地方就不用了

/**
 * webpack.config.js未配置Babel时
 * 直接用react
 * @type {[type]}
 */
// var e = React.createElement('p',null,'This is React Demo');
// ReactDOM.render(e, document.getElementById('main'));

//配置了Babel后
class Text extends React.Component {
    //多于一个标签的时候，不能直接render，需要有一个div包起来
    render() {
        return (
          <div>
            <p> This is a React Component </p>
            <DatePicker />
          </div>
        );
    }
}

ReactDOM.render(<Text/>,document.getElementById('main'));
