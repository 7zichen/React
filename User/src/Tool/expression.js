export default function Expression(){
        //用户名
        const use =(e) => {
            check(/^\w$/.test(e.target.value), e);
        }
        // 注册
        const phone =(e) => {
            check(/^(1[3578]\d{9})$/.test(e.target.value), e);
        }
        //密码
        const password =(e) => {
            check(/^\w$/.test(e.target.value), e);
        }
        //账号密码验证
        const check=(r, e)=> {
            if (r) {
                e.target.nextElementSibling.innerHTML = "<img src='/imgs/dui.png'>"
            } else {
                e.target.nextElementSibling.innerHTML = "<img src='/imgs/cuo.png'>"
            }
        }
    return(
        <div></div>
    )
}
