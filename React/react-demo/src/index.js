import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import registerServiceWorker from './regesterServiceWorker'
import {BrowserRouter} from 'react-router-dom'


// 创建一个react元素
const element = <h1>Hello React</h1> 

ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>, document.getElementById('root')
);

// ReactDOM.render(
//   element, // react 渲染的对象
//   document.getElementById('root') // 以及页面中要去显示的位置
// );

