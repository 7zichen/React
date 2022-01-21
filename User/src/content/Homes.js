import '../css/Home.css';
import { useEffect, useState } from 'react';
import { ApiGet } from '../Tool/Api'
import { Link,useParams } from 'react-router-dom';
import { BackTop,Pagination} from 'antd';
export default function Homes() {
    let [data, setDate] = useState([]);
    let [page, setpage] = useState([]);
    let [cerrpage, setcerrpage] = useState([]);
    let [name, setName] = useState([]);
    const params=useParams()
    let filer=data.filter(e=>e.column.columnName==params.columnName)
    useEffect(() => {
        ApiGet(`/newsfront/list?columnName=${params.columnName}`, back => {
            setDate(back.data.data.list)
            setpage(back.data.data.total)
            setcerrpage(back.data.data.pageNum)
        })
        ApiGet(`/newsfront/columns?columnName=${params.columnName}`, back => {
            // console.log(back.data.data);
            setName(back.data.data)
        })
    }, [params.columnName])
    //分页
    let change = (page) => {
        ApiGet(`/newsfront/list?page=${page}`, back=> {
            console.log(back.page);
            setDate(back.data.data.list);
            setpage(back.data.data.total);
            setcerrpage(back.data.data.pageNum);
        })
    }
    return (
        <div>
            <img src="/imgs/logo.png"></img>
            <span id='come'><Link to={"/"} id='come1'>首页</Link></span>
            <span id='come3'><Link to={"/Signin"} id='come1'>登录</Link></span>
            <div id='div'>
            <a id='span' href='/'><span>首页</span></a>
                {
                    name.map((item, index) => (
                        <span key={index} id='span'><Link to={`/Homes${item.columnName}`} id='bule'>{item.columnName}</Link></span>
                        ))
                }
            </div>
            <div>
                <h2 id='head'>{params.columnName}</h2>
                {
                    filer.map((item, index) => (
                        <div key={index}>
                            <div id='title'>
                                <img src={item.pic} id='img' />
                                <h3 id='title2'><Link to={"/Detpage" + item.newsId}>{item.title}</Link></h3>
                                <span id='span2'>{item.remark}</span>
                                <span id='span3'>发布时间：{item.date} | </span>
                                <span id='span4'>作者：{item.author} </span>

                            </div>
                        </div>
                    ))
                }
                <Pagination total={page} onChange={change} current={cerrpage} />
            </div>
            {/* 置顶 */}
            <BackTop />
                <strong className="site-back-top-basic"></strong>
            <img src="/imgs/foot.png"></img>
        </div>
    )
}