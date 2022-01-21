import '../css/AddTo.css'
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../Tool/ReuestApi';
import { notification,message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
export default function AddTo() {
    const openNotification = () => {
        notification.open({
          message: 'Added successfully',
          description:
            '添加成功',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
      };
    const navigate = useNavigate();
    let ToManage=()=>navigate('/Homepage/Manage')
    const inputref = useRef();
    const subsit = () => {
        apiPost('/news/column/add',`columnName=${inputref.current.value}`, back => {
            if (back.data.code == 2) {
                ToManage()
                openNotification()
            } else if (back.data.code == 3 && back.data.code == 4) {
                message.error("添加失败")
            }
            console.log(back);
        })
    }
    return (
        <div>
            <span id='heads'>您当前的位置：栏目管理</span>
            <b id='b'>添加栏目</b>
            <span id='names'>栏目名称</span>
                <input id='input' ref={inputref}></input>
                <button id='button' onClick={subsit}>提交</button>
        </div>
    );
}