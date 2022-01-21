import '../css/Home.css';
import React from 'react'
import { useEffect, useState, createElement, useRef } from 'react';
import { ApiGet, ApiPost } from '../Tool/Api'
import { Link, useParams, useNavigate} from 'react-router-dom';
import { Comment, Tooltip, Avatar, Input,notification,BackTop} from 'antd';
import moment from 'moment';
import { LikeOutlined, LikeFilled,SmileOutlined  } from '@ant-design/icons';
export default function Comments() {
    const openNotification = () => {
        notification.open({
          message: 'Please login',
          description:
            '请登录',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
      };
      const openNotifications = () => {
        notification.open({
          message: 'Safe exit',
          description:
            '安全退出',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
      };
    const inputref = useRef()
    const { TextArea } = Input;
    const [data, setDate] = useState([]);
    const [notes, setNotes] = useState([]);
    let navigate = useNavigate();
    let ToManage = () => navigate('/Signin')
    const params = useParams();
    let textref = useRef();
    useEffect(() => {
        let id = params.id
        ApiGet("/newsfront/detail?newsId=" + id, back => {
            // console.log(back.data.data.notes);
            setDate(back.data.data)
            setNotes(back.data.data.notes)
        })
    }, [])

    const [likes, setLikes] = useState(0);
    const [action, setAction] = useState(null);
    //点赞
    const like = (e) => {
        ApiGet(`/comment/favor?id=${e.target.id}&type=1`, back => {
            // console.log(e.target.id);
            // console.log(back);
            e.target.innerHTML++;
            console.log(back);
            if (back.data.code == 4) {
                openNotification()
                ToManage()
            }
        })
        setLikes(1);
        // setAction('liked');
    };
    // 第二个点赞
    const dlike = (e) => {
        ApiGet(`/comment/favor?id=${e.target.id}&type=2`, back => {
            // console.log(e.target.id);
            // console.log(back);
            e.target.innerHTML++;
            console.log(back);
            if (back.data.code == 4) {
                openNotification()
                ToManage()
            }
        })
        setLikes(1);
        // setAction('liked');
    };
    
    //回复评论
    const reply = (e) => {
        let d = e.target.parentNode.nextElementSibling.children[0];
        if (d.style.display == 'none') {
            d.style.display = 'block'
        } else {
            d.style.display = 'none'
        }
    }
    //提交评论
    let resp = (e) => {
        let r = e.target.previousElementSibling.value;
        // console.log(e.target.id);
        ApiPost('/comment/reply', `noteId=${e.target.id}&text=${r}`, back => {
            console.log(back);
            if (back.data.code == 2) {
                window.location.reload();
            } else {
               openNotification()
                ToManage()
            }
        })
    }
    //发表
    let publis = () => {
        ApiPost('/comment/add', `newsId=${params.id}&text=${textref.current.value}`, back => {
            // console.log(params.id);
            // console.log(back);
            if (back.data.code == 2) {
                window.location.reload();
            } else {
                openNotification()
                ToManage()
            }
        })
    }
    //安全退出
    let signOut=()=>{
        ApiGet("/cus/logout", back => {
            if(back.data.code==2){
                localStorage.removeItem("X-Token");
                ToManage()
                openNotifications()
            }
        })
    }

    return (
        <div>
            <img src="/imgs/logo.png"></img>
            <span id='come'><Link to={"/"} id='come1'>首页</Link></span>
            <span id='come3'><Link to={"/Signin"} id='come1'>登录</Link></span>
            <span id='come4' onClick={signOut}>安全退出</span>
            <div id='auto'>
                <h3 id='h3'>{data.title}</h3>
                <span id='remark'>{data.remark}</span>
                <span id='date'>发布时间：{data.date} | </span>
                <span id='author'>作者：{data.author} </span>
            </div>
            <div>
                <div dangerouslySetInnerHTML={{ __html: data.content }} id='cont'></div>
                <div id='division'>
                    <img src={data.pic} id='conts' />
                </div>
                <div id='font'>
                    <h3 id='comment'>发表评论</h3>
                    <img src='/imgs/touxiang.png' id='headP' />
                    <textarea id='tex' placeholder='发表神评论' ref={textref}></textarea>
                    <span id='publis' onClick={publis}>发表</span>
                </div>
            </div>
            {
                notes.map((item, index) => (
                    <Comment key={index}
                        actions={[
                            <Tooltip key="comment-basic-like" title="Like">
                                <span>
                                    {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                                    <span className="comment-action" onClick={like} id={item.id}>{item.favor}</span>
                                </span>
                            </Tooltip>,
                            <span key="comment-basic-reply-to" onClick={reply} id={item.avatar.account}>回复</span>,
                            <div id='answer' style={{ display: 'none' }}>
                                <TextArea rows={4} />
                                <button className='butt' onClick={resp} ref={inputref} id={item.id}>回复</button>
                            </div>
                        ]}
                        author={<a>{item.avatar.account}</a>}
                        avatar={<Avatar src={`http://192.168.0.254:8088/${item.avatar.portrait}`}alt="Han Solo" />}
                        content={
                            <p>{item.text}</p>
                        }
                        datetime={
                            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{item.date}</span>
                            </Tooltip>
                        }
                    >
                        {
                            item.replys.map((item, index) => (
                                <Comment key={index}
                                    actions={[
                                        <Tooltip key="comment-basic-like" title="Like">
                                            <span>
                                                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                                                <span className="comment-action" onClick={dlike} id={item.id}>{item.favor}</span>
                                            </span>
                                        </Tooltip>,
                                        <span key="comment-basic-reply-to" onClick={reply} id={item.avatar.account}>回复</span>,
                                        <div id='answer' style={{ display: 'none' }}>
                                            <TextArea rows={4} />
                                            <button className='butt' onClick={resp} ref={inputref} id={item.id}>回复</button>
                                        </div>
                                    ]}
                                    author={<a>{item.avatar.account}</a>}
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                                    content={
                                        <p>{item.text}</p>
                                    }
                                    datetime={
                                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                            <span>{item.date}</span>
                                        </Tooltip>
                                    }
                                />

                            ))
                        }
                    </Comment>

                ))
            }
             {/* 置顶 */}
             <BackTop />
                <strong className="site-back-top-basic"></strong>
            <img src="/imgs/foot.png"></img>
        </div>
    )
}