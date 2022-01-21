import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
moment.locale('zh-cn');
const Amd = () => {
  return (
    <div locale={zhCN}>
          <App/>
    </div>
  );
};
ReactDOM.render(<Amd/>, document.getElementById('root'));