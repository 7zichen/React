import '../css/AddTo.css';
import { Table,message, notification,Popconfirm } from 'antd';
import { useState,useRef } from "react";
import { Link} from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
import axios from 'axios';
export default function Admin() {
    const openNotification = () => {
        notification.open({
            message: 'Added successfully',
            description:
                '删除成功',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };
    const token = localStorage.getItem("X-Token");
    const [data, setData] = useState([]);
    let newsref=useRef();
    let titleref=useRef();
    let dateref=useRef();
    let pageref=useRef();
    //查询
    let getQuery=()=>{
        axios.get(`/news/query?newsId=${newsref.current.value}&title=${titleref.current.value}&startDate=${dateref.current.value}&page=${pageref.current.value}`, { headers: { 'X-Token': `${token}` } }).then(resp => {
            let data = resp.data.data.list;
            console.log(data);
            setData(data)
        })
    }
    //清空
    let getclear=()=>{
        let clear=document.querySelectorAll('input');
        clear.forEach(e => {
            e.value=''
        });
    }
    //删除
    let del = (e) => {
        axios.get(`/news/delete?newsId=${e.target.id}`, { headers: { 'X-Token': `${token}` } }).then(resp => {
            if (resp.data.code == 2) {
            } else if (resp.data.code == 3 && resp.data.code == 4) {
                message.error("删除失败")
            }
        })
    }
    function confirm(e) {
        console.log(e);
        openNotification()
    }

    function cancel(e) {
        console.log(e);
        message.error("你已取消删除操作")
    }
    //查看
    const columns = [
        {
            title: '新闻标题',
            dataIndex: 'newsId',
            key: 'newsId',
        },
        {
            title: '新闻编号',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: '创建',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (r, temp) => <span>
                <button id={temp.newsId} name={temp.columnName} className='button'><Link to={"/Homepage/Jmondify" + temp.newsId}>修改</Link></button>
                <Popconfirm
                    title="你确定要删除吗?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="确定"
                    cancelText="取消"
                >
                <button id={temp.newsId} onClick={del}>删除</button>
                </Popconfirm>
                <button id={temp.newsId} className='button'><Link to={"/Homepage/See" + temp.newsId}>查看</Link></button>
            </span>
        },
    ];
    return (
        <div>
            <span id='heads'>您当前的位置 : 管理首页 {'>'} 新闻查询</span>
            <b id='b'>新闻查询</b>
            <input placeholder='编号' ref={newsref}/>
            <input placeholder='标签' ref={titleref}/>
            <input placeholder='日期' ref={dateref}/>
            <input placeholder='页码' ref={pageref}/>
            <button onClick={getQuery}>查询</button>
            <button onClick={getclear}>清空</button>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}