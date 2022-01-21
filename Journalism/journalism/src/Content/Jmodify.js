import { useEffect, useRef, useState } from 'react';
import { Form, Button, Radio, Upload, message,notification} from 'antd';
import { UploadOutlined,SmileOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import E from 'wangeditor'
import axios from 'axios';
import '../css/AddTo.css'

let editor;
let url='';
export default function Mondify() {
    const openNotification = () => {
        notification.open({
            message: 'Added successfully',
            description:
                '修改成功',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };
    let titleref=useRef();
    let inputref=useRef();
    let [data, setData] = useState([])
    let [call, setcall] = useState([])
    const navigate = useNavigate()
    let ToManage = () => navigate('/Homepage/Admin')
    const params = useParams();
    const token = localStorage.getItem('X-Token')
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
        let id = params.id;
        axios.get("/news/detail?newsId=" + id, { headers: { 'X-Token': `${token}` } }).then(resp => {
            data = resp.data.data;
            console.log(data);
            editor.txt.append(`${data.content}`)
            setData(data)
        })
        axios.get(`/news/column/all?`, { headers: { "X-Token": `${token}` } }).then(resp => {
            call= resp.data.data;
            console.log(data);
            setcall(call);
        })
    },[])
    let getMondify = () => {
        const i = new FormData()
        i.append('title', titleref.current.value)
        i.append('newsId', params.id)
        i.append('columnId',inputref.current.value)
        i.append('content', editor.txt.html())
        i.append('pic',url)
        axios.post(`/news/update`,i, { headers: { 'X-Token': `${token}` } }).then(resp => {
            console.log(resp.data);
            if (resp.data.code == 2) {
                ToManage()
                openNotification()
            } else if (resp.data.code == 3 && resp.data.code == 4) {
                message.error("修改失败")
            }
        });
    }
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
                url=(JSON.parse(info.file.xhr.responseText).data[0].url)
                console.log((JSON.parse(info.file.xhr.responseText).data[0].url));
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <div>
            <span id='heads'>您当前的位置：新闻管理{'>'}新闻添加</span>
            <b>新闻修改</b>
            <Form
                name="wrap"
                labelCol={{}}
                labelAlign="content"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
            >
                <span className='span'>新闻编号</span>
                <input defaultValue={data.newsId} id='title' /><br />
                <span className='span'>新闻标题</span>
                <input defaultValue={data.title} ref={titleref} id='title2' />
                <span className='span'>新闻作者</span>
                <input value="admin" disabled id='title2' /><br/>
                <span className='span'>新闻作者</span>
                <input defaultValue={data.columnId} ref={inputref} id='title2'></input>
                <Form.Item label="新闻分类">
                <Radio.Group name="radiogroup" defaultValue={1}>
                        {
                            call.map((item, index) => (
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
                    <div id="div1"></div>
                    <Button type="primary" htmlType="submit" onClick={getMondify}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}