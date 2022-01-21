import '../css/Home.css';
import { useEffect, useState } from 'react';
import { ApiGet } from '../Tool/Api';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BackTop, notification } from 'antd'; //置顶
import { SmileOutlined } from '@ant-design/icons';
export default function Home() {
    const openNotifications = () => {
        notification.open({
            message: 'Safe exit',
            description:
                '安全退出',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };
    let [data, setDate] = useState([]);
    let [name, setName] = useState([]);
    let [call, setCall] = useState([]);
    let navigate = useNavigate();
    let ToManage = () => navigate('/Signin')
    //挂载
    useEffect(() => {
        ApiGet("/newsfront/columns", back => {
            setName(back.data.data)
            call = back.data.data
            for (let i = 0; i < call.length; i++) {
                ApiGet(`/newsfront/list?columnName=${call[i].columnName}&page=1`, back => {
                    data = back.data.data.list
                    setDate(back.data.data.list)
                    call[i].list = data;
                    call = JSON.parse(JSON.stringify(call))
                    setCall(call)
                })
            }
        })

    }, [])
    //安全退出
    let signOut = () => {
        ApiGet("/cus/logout", back => {
            if (back.data.code == 2) {
                localStorage.removeItem("X-Token");
                ToManage()
                openNotifications()
            }
        })
    }
    return (
        <div>
            <img src="/imgs/logo.png"></img>
            <span id='come'><Link to={"/Signin"} id='come1'>登录</Link></span>
            <span id='come3' onClick={signOut}>安全退出</span>
            <div id='div'>
                <a id='span' href='/'><span>首页</span></a>
                {
                    name.map((item, index) => (
                        <span key={index} id='span'><Link to={"/Homes" + item.columnName} id='bule'>{item.columnName}</Link></span>
                    ))
                }
            </div>
            <div>
                {
                    call.map((item, index) => (
                        <div key={index}>
                            <h2 id='head'>{item.columnName}<Link to={"/Homes" + item.columnName}>更多</Link></h2>
                            {
                                item.list && item.list.map(e => (
                                    <div id='title'>
                                        <img src={e.pic} id='img' />
                                        <h3 id='title2'><Link to={"/Detpage" + e.newsId}>{e.title}</Link></h3>
                                        <span id='span2'>{e.remark}</span>
                                        <span id='span3'>发布时间：{e.date} | </span>
                                        <span id='span4'>作者：{e.author} </span>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
                <Outlet></Outlet>
            </div>
            {/* 置顶 */}
            <BackTop />
            <strong className="site-back-top-basic"></strong>
            <img src="/imgs/foot.png"></img>
        </div>
    )
}