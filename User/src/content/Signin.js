import React from 'react';
import '../css/Register.css';
import '../font-awesome-4.7.0/css/font-awesome.min.css';
import { Link,useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { ApiPost } from '../Tool/Api'
import { notification,message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export default function Register() {
    const openNotification = () => {
        notification.open({
          message: 'Added successfully',
          description:
            '登录成功',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
      };
    let accountref = useRef();
    let passwordref = useRef();
    const navigate = useNavigate();
    let ToManage = () => navigate('/')
    //登录
    let Sign=()=>{
        ApiPost('/cus/login', `account=${accountref.current.value}&password=${passwordref.current.value}`, back => {
            // localStorage.setItem("X-Token", back.data.data.token);
            if (back.data.code == 2) {
                localStorage.setItem("X-Token", back.data.data.token);
                openNotification()
                ToManage()
            } else if (back.data.code == 3 && back.data.code == 4) {
                message.error("登录失败")
            }
            console.log(back.data);
        })
    }
    return (
        <div id='sign'>
            <div className="signinform">
                <h1>欢迎登录</h1>
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- main content --> */}
                    <div className="w3l-form-info">
                        <div className="w3l_form">
                            <div className="left_grid_info">
                                <img src="imgs/image.svg" alt="" />
                            </div>
                        </div>
                        <div className="w3_info">
                            <form action="#" method="post">
                                <div className="input-group">
                                    <span><i className="fa fa-user" aria-hidden="true"></i></span>
                                    <input type="email" placeholder="请设置用户名" ref={accountref} />
                                </div>
                                <div className="input-group">
                                    <span><i className="fa fa-key" aria-hidden="true"></i></span>
                                    <input type="Password" placeholder="请设置密码" ref={passwordref} />
                                </div>
                                <div className="form-row bottom">
                                    <div className="form-check">
                                        <input type="checkbox" id="remenber" name="remenber" value="remenber" />
                                        <label htmlFor="remenber">阅读并接受</label>
                                    </div>
                                    <a href="#url" className="forgot">忘记密码？</a>
                                </div>
                                <span className="btn btn-primary btn-block" type="submit" onClick={Sign}><Link to="" id='link'>登录</Link></span>
                            </form>
                            <p className="continue"><span>或者登录</span></p>
                            <p className="account">你没有账户吗？<a href="./register">请注册</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}