import { useEffect, useRef, useState } from 'react';
import { Form, Button,Radio,Upload, message, notification } from 'antd';
import { UploadOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../css/AddTo.css'
import E from 'wangeditor'
import { apiPost } from '../Tool/ReuestApi'
import axios from 'axios';
let editor;
let url = ''
export default function UserAdd() {
    const openNotification = () => {
        notification.open({
            message: 'Added successfully',
            description:
                '添加成功',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };
    const navigate = useNavigate()
    let ToManage = () => navigate('/Homepage/Admin')
    const inputref = useRef();
    const nameref = useRef();
    let [pic, setpic] = useState({})
    let [data, setdata] = useState([])
    const token = localStorage.getItem('X-Token')
    //挂载
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
        axios.get(`/news/column/all?`, { headers: { "X-Token": `${token}` } }).then(resp => {
            data = resp.data.data;
            console.log(data);
            setdata(data);
        })

    }, [])

    const props = {
        name: 'file',
        action: '/news/upload',
        listType: 'picture',
        headers: {
            'X-Token': `${token}`,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
                url = (JSON.parse(info.file.xhr.responseText).data[0].url)
                console.log((JSON.parse(info.file.xhr.responseText).data[0].url));
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    //提交
    let getsub = () => {
        const i = new FormData()
        i.append('title', inputref.current.value)
        i.append('columnId', nameref.current.value)
        i.append('content', editor.txt.html())
        i.append('pic', url)
        apiPost('/news/add', i, back => {
            if (back.data.code == 2) {
                ToManage()
                openNotification()
            } else if (back.data.code == 3 && back.data.code == 4) {
                message.error("添加失败")
            }
            // console.log(back);
            console.log(props);
        })
    }
    return (
        <div>
            <span id='heads'>您当前的位置：系统管理</span>
            <b>新闻添加</b>
            <Form
                name="wrap"
                labelCol={{}}
                labelAlign="content"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
            >
                <span className='span'>新闻标题</span>
                <input ref={inputref} id='title' /><br />
                <span className='span'>新闻用户</span>
                <input ref={nameref} id='title2' />
                <Form.Item label="用户权限">
                    <Radio.Group name="radiogroup" defaultValue={1}>
                        {
                            data.map((item, index) => (
                                <Radio key={index} value={item.columnId}>{item.columnName}</Radio>
                            ))
                        }
                    </Radio.Group>
                </Form.Item>
                <Form.Item label=" ">
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>上传文件</Button>
                    </Upload>
                    <span id='not'>未选择任何文件</span>
                    <span id='not'>新闻图片</span>
                    <span id='content'>新闻的内容</span>
                    <div id="div1" ></div>
                    <Button type="primary" htmlType="submit" onClick={getsub}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}