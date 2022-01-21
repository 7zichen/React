# 新闻后台管理系统接口

## 说明：

以下 api 路径均以 http://192.168.0.254:8088 为前缀

响应内容：

```
{
 "code": 状态码（1 - 登录系统问题， 2 - 操作成功，3 - 参数错误，4 - 操作失败，5 - 服务器问题）
 "message": 状态详细信息
 "data": 数据
}
```

---



### GET  /newsfront/list    新闻首页（分页）

> 参数

- **page**                    *number*    页码，默认为1。 **可选**

- **columnName**    *String*       新闻分类。 **可选**

  

> 响应示例

    {"code": 2, "message": "success", data: {...}}



### GET  /newsfront/detail    新闻详情

> 参数

- **newsId**        *String*    新闻编号。 **必须**

  

> 响应示例

```json
{"code": 2, "message": "success", data: {...}}
```



### GET  /newsfront/columns    所有新闻栏目

> 响应示例

```json
{"code": 2, "message": "success", data: {...}}
```



### POST   /comment/add    发表评论 

> 参数

- **newsId**     *String*   新闻编号。&nbsp; **必须**

- **text**           *String*   评论内容。 &nbsp; **必须**




> 响应示例

    {"code": 2, "message": "success"}



### POST   /comment/reply   回复评论 

> 参数

- **noteId**      *String*   新闻评论的编号。&nbsp; **必须**

- **text**           *String*   回复内容。 &nbsp; **必须**

  

> 响应示例

    {"code": 2, "message": "success"}



### GET   /comment/favor    点赞

> 参数

- **id**        *String*        评论的编号。 **必须**

- **type**   *number*    类别，可选的值如下。**必须**

  - 1    评论
  - 2    评论回复

  

> 响应示例

    {"code": 2, "message": "success"}

---



### 客户登录

#### POST    /cus/registe   注册

> 参数

- **account**         *String*    账号。**必须**

- **password**      *String*    密码。**必须**

- **tel**                   *String*    手机号。**必须**

- **file**         *File*    头像。**可选**

- **remark**          *String*     描述。**可选**

  

> 响应

```json
{"code": 2, "message": "success"}
```





#### POST   /cus/login   登录

> 参数

- **account**   *String*    账号

- **password**      *String*    密码

  

> 响应示例

```js
{
    code: 2, 
    message: 'success', 
    data: {
        user: {...}, 
        token:   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNjI4NzQ5MjQ1MDg5IiwiZXhwIjoxNjI4NzU2NzMxLCJzdWIiOiJhZG1pbiIsImlhdCI6MTYyODc1NDkzMX0.CheKh__bf6LCUUq41Lqm_xZOMMlUkfJLLbEjRVvjPIA'
    }
}
```



#### GET   /cus/logout   退出

> 响应示例

```js
{ code: 2, message: '退出成功' }
```

---



