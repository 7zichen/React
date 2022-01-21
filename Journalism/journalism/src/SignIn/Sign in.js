//路由跳转
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
//气泡弹框
import { message } from 'antd';
import '../css/Sign in.css'
const axios = require('axios')
export default function SignIn() {
    const navigate = useNavigate();
    const inputref = useRef()
    const passwordref = useRef()
    //登录
    let sign = () => {
        axios.post("/sys/login", `username=${inputref.current.value}&password=${passwordref.current.value}`)
            .then(resp => {
                if (resp.data.code == 2) {
                    localStorage.setItem("X-Token",resp.data.data.token)
                    navigate('/Homepage')
                } else if(resp.data.code==1){
                    message.error('登录系统问题');
                }else if(resp.data.code==3){
                    message.error('参数错误');
                }else if(resp.data.code==4){
                    message.error('账号或密码错误');
                }else{
                    message.error('服务器问题');
                }
                console.log(resp);
            })
            
    }
    return (
        <div id='backg'>
            <div id='sign'>
                <h2>新闻管理系统</h2>
                <span>用户名:</span>
                <input type="text" id="username" ref={inputref} /><br />
                <span>密码:</span>
                <input type="password" id="password" ref={passwordref} />
                <span>验证码</span>
                <input id='inp' />
                <img src='./verify.PNG' />
                <button onClick={sign}>登录</button>
            </div>
        </div>
    )
}