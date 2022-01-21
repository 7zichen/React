import '../css/Home.css';
import { useEffect, useState } from 'react';
import { ApiGet } from '../Tool/Api'
import { Link,useParams } from 'react-router-dom';
export default function Detpage() {
    const [data, setDate] = useState([]);
    const params = useParams();
    useEffect(() => {
        let id = params.id
        ApiGet("/newsfront/detail?newsId=" + id, back => {
            console.log(back.data.data);
            setDate(back.data.data)
        })
    }, [])
    return (
        <div>
            <img src="/imgs/logo.png"></img>
            <span id='come'><Link to={"/"} id='come1'>首页</Link></span>
            <span id='come3'><Link to={"/Signin"} id='come1'>登录</Link></span>
            <div id='title'>
                <img src={data.pic} id='img' />
                <h3 id='title2'><Link to={"/Comments"+data.newsId}>{data.title}</Link></h3>
                <span id='span2'>{data.remark}</span>
                <span id='span3'>发布时间：{data.date} | </span>
                <span id='span4'>作者：{data.author} </span>
            </div>
            <img src="/imgs/foot.png"></img>
        </div>
    )
}