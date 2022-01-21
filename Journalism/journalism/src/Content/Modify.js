import '../css/AddTo.css'
import { useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { notification, message} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
export default function Mondify() {
    const openNotification = () => {
        notification.open({
            message: 'Added successfully',
            description:
                '修改成功',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };
    const token = localStorage.getItem('X-Token')
    const params = useParams();
    const navigate = useNavigate();
    let ToManage=()=>navigate('/Homepage/Manage')
    const inputref = useRef();
    //提交
    let getMondify = () => {
        axios.post(`/news/column/update?columnName=${inputref.current.value}&columnId=${(params.id)}`, { columnId: parseInt(params.id) }, { headers: { 'X-Token': `${token}` } }).then(resp => {
            console.log(resp.data);
            if (resp.data.code == 2) {
                ToManage()
               openNotification()
            } else if (resp.data.code == 3 && resp.data.code == 4) {
                message.error("修改失败")
            }
        });
    }
    return (
        <div>
             <span id='heads'>您当前的位置 : 管理首页 {'>'} 栏目管理 {'>'}栏目修改</span>
            <b id='b'>栏目修改</b>
            <span>
                栏目编号
                <input value={params.id} disabled id='number' />
            </span><br />
            <span>
                栏目名称
                <input ref={inputref} id='numName'defaultValue={params.name} />
            </span>
            <button onClick={getMondify} id='butt'>提交</button>
        </div>
    )
}
