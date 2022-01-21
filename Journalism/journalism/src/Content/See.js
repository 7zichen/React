import { Alert } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../css/AddTo.css'
import E from 'wangeditor'
let editor;
export default function See() {
    const token = localStorage.getItem("X-Token");
    let [data, setData] = useState([])
    const params = useParams()
    const [pic, setpic] = useState({})
    useEffect(() => {
        editor = new E("#div1");
        editor.config.uploadFileName = 'file'
        editor.config.uploadImgServer = '/news/upload'
        editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
        editor.config.uploadImgMaxSize = 50 * 1024 * 1024
        // editor.config.uploadImgParams = {
        //     "X-Token": localStorage.getItem("X-Token"),
        // }
        editor.config.uploadImgHeaders = {
            "X-Token": localStorage.getItem("X-Token"),
        }
        editor.config.uploadImgHooks = {
            success: function (xhr) {
                pic = JSON.parse(xhr.responseText).data[0].url;
                setpic(pic)
                console.log('success', xhr)
            },
            // 图片上传并返回了结果，但图片插入时出错了
            fail: function (xhr, editor, resData) {
                console.log('fail', resData)
            },
            // 上传图片出错，一般为 http 请求的错误
            error: function (xhr, editor, resData) {
                console.log('error', xhr, resData)
            }
        }
        editor.create()
        let id = params.id
        axios.get("/news/detail?newsId=" + id, { headers: { 'X-Token': `${token}` } }).then(resp => {
            data = resp.data.data;
            console.log(data);
            editor.txt.append(`${data.content}`)
            setData(data)
        })
    }, [])
    return (
        <div>
            <Alert message="新闻编号 :" type="success" className='info' />
            <input defaultValue={data.newsId} className='info'disabled />
            <Alert message="新闻标题 :" type="info" className='info' />
            <input defaultValue={data.title} className='info' />
            <Alert message="开始时间 :" type="warning" className='info' />
            <input defaultValue={data.date} className='info' />
            <Alert message="截止日期 :" type="error" className='info' />
            <input defaultValue={data.date} className='info' />
            <Alert message="新闻内容 :" type="info" className='info' />
            <div id="div1"></div>
            {/* <input defaultValue={data.content} className='info' /> */}
            <button id='error'><Link to={"/Homepage/Admin"} id='but'>返回</Link></button>
            <img src={data.pic} id='img'/>
        </div>
    )
}