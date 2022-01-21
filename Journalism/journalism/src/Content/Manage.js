import '../css/Message.css'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { notification, message, Table, Popconfirm } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
const axios = require('axios')
export default function Manage() {
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
    useEffect(() => {
        axios.get("/news/column/all", { headers: { 'X-Token': `${token}` } }).then(resp => {
            let data = resp.data.data;
            // console.log(data);
            setData(data)
        })
    }, [])
    //删除
    let del = (e) => {
        axios.get(`/news/column/delete?columnId=${e.target.id}`, { headers: { 'X-Token': `${token}` } }).then(resp => {
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
    //修改
    const columns = [
        {
            title: '栏目编号',
            dataIndex: 'columnId',
            key: 'columnId',
        },
        {
            title: '名称',
            dataIndex: 'columnName',
            key: 'columnName',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (r, temp) => <span>
                <button id={temp.columnId} name={temp.columnName} className='button'><Link to={`/Homepage/Modify/${temp.columnId}/${temp.columnName}`}>修改</Link></button>
                <Popconfirm
                    title="你确定要删除吗?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <button id={temp.columnId} onClick={del}>删除</button>
                </Popconfirm>
            </span>
        },
    ];
    return (
        <div>
            <span id='heads'>您当前的位置 : 管理首页 {'>'} 栏目管理</span>
            <b id='b'>新闻的栏目管理</b>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}