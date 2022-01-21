import '../css/Register.css';
import React from 'react'
import '../font-awesome-4.7.0/css/font-awesome.min.css';
import { useRef, useState } from 'react';
import { ApiPost } from '../Tool/Api'
import { Link, useNavigate } from 'react-router-dom';
import { notification, message, Form,Button ,Upload} from 'antd';
import { LoadingOutlined, PlusOutlined} from '@ant-design/icons';
let url=''
export default function Register() {
    const [file,setfile]=useState('');
    const openNotification = () => {
        notification.open({
            message: 'Added successfully',
            description:
                '注册成功',
        });
    };
    //用户名
    const use = (e) => {
        check(/^\S{1,12}$/.test(e.target.value), e);
    }
    // 注册
    const phone = (e) => {
        check(/^(1[35789]\d{9})$/.test(e.target.value), e);
    }
    //密码
    const password = (e) => {
        check(/^\S{1,12}$/.test(e.target.value), e);
    }
    //账号密码验证
    const check = (r, e) => {
        if (r) {
            e.target.nextElementSibling.innerHTML = "<img src='/imgs/dui.png'>"
        } else {
            e.target.nextElementSibling.innerHTML = "<img src='/imgs/cuo.png'>"
        }
    }
    let inputref = useRef();
    let phoneref = useRef();
    let passwordref = useRef();
    const navigate = useNavigate();
    let ToManage = () => navigate('/Signin')
    //注册
    let getRegister = () => {
        const i = new FormData()
        i.append('account',inputref.current.value)
        i.append('tel',phoneref.current.value)
        i.append('password',passwordref.current.value)
        i.append('file',url)
        if (check) {
            ApiPost('/cus/registe', i, back => {
                if (back.data.code == 2) {
                    ToManage()
                    openNotification()
                } else {
                    message.error("添加失败")
                }
                // console.log(back);
            })
        } else {
            message.error("手机格式不对")
        }
    }
    //表单提交
    const onFinish = (v) => {
        setfile(v.file.file)
    }
    return (
        <div id='bgm'>
            <div className="signinform">
                <h1>欢迎注册</h1>
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
                            <Form action="#" method="post" onFinish={onFinish} initialValues={{ remember: true, }}>
                                <div className="input-group">
                                    <span><i className="fa fa-user" aria-hidden="true"></i></span>
                                    <input type="text" placeholder="请设置用户名" onChange={use} ref={inputref} /><span></span>
                                </div>
                                <div className="input-group">
                                    <span><i className="fa fa-phone" aria-hidden="true"></i></span>
                                    <input type="text" placeholder="请输入手机号" onChange={phone} ref={phoneref} /><span></span>
                                </div>
                                <div className="input-group">
                                    <span><i className="fa fa-key" aria-hidden="true"></i></span>
                                    <input type="Password" placeholder="请设置密码" onChange={password} ref={passwordref} /><span></span>
                                </div>
                                <div className="form-row bottom">
                                    <div className="form-check">
                                        <input type="checkbox" id="remenber" name="remenber" value="remenber" />
                                        <label htmlFor="remenber">阅读并接受</label>
                                    </div>
                                </div>
                                <Avatar />
                                <button className="btn btn-primary btn-block" type="submit" onClick={getRegister}><Link to="" id='link1'>注册</Link></button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
      console.log("file",file);
      url=file
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  
  class Avatar extends React.Component {
    state = {
      loading: false,
    };
  
    handleChange = info => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          }),
        );
      }
    };
  
    render() {
      const { loading, imageUrl } = this.state;
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>上传头像</div>
        </div>
      );
      return (
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="/cus/registe"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      );
    }
  }
  