# 新闻后台管理系统接口

## 说明：

以下 api 路径均以 http://192.168.0.254:8086 为前缀

响应内容：

```
{
 "code": 状态码（1 - 登录系统问题， 2 - 操作成功，3 - 参数错误，4 - 操作失败，5 - 服务器问题）
 "message": 状态详细信息
 "data": 数据
}
```

---



## 登录

### POST   /sys/login   登录

> 参数

- **username**   *String*    账号

- **password**      *String*    密码

  

> 响应示例

```js
{
    code: 2, 
    message: 'success', 
    data: {
        username: 'admin', 
        token:   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNjI4NzQ5MjQ1MDg5IiwiZXhwIjoxNjI4NzU2NzMxLCJzdWIiOiJhZG1pbiIsImlhdCI6MTYyODc1NDkzMX0.CheKh__bf6LCUUq41Lqm_xZOMMlUkfJLLbEjRVvjPIA'
    }
}
```



### GET   /sys/logout   退出

> 响应示例

```js
{ code: 2, message: '退出成功', data: null }
```

---



## 新闻管理

### POST &nbsp; /news/add &nbsp; 添加新闻 

> 参数

- **title**             *String* &nbsp; 标题。&nbsp; **必须**

- **content**      *String*   内容。 &nbsp; **必须**

- **columnId** &nbsp; *number* 栏目编号。 &nbsp; **必须**

- **pic**               *String*       图片路径。  **可选**

- **remark**       *String*     描述。**可选**

  

> 响应示例

```json
{"code": 2, "message": "success"}
```



### POST   /news/upload &nbsp; 上传文件

>  参数

- **file**          *file*       文件。  **必须**

> 响应示例

```json
{"code": 2, "message": "success", "data":"文件上传成功"}
```





### POST &nbsp; /news/update &nbsp; 修改指定的新闻

> 参数

- **newsId**        *number*   新闻id。 **必须**

- **title**             *String* &nbsp; 标题。&nbsp; **必须**

- **content**      *String*   内容。 &nbsp; **必须**

- **columnId**   *number*  栏目编号。 &nbsp; **必须**

- **pic**               *String*       图片路径。  **可选**

- **remark**       *String*     描述。**可选**

  

> 响应示例

    {"code": 2, "message": "success"}



### GET &nbsp; /news/delete &nbsp; 删除指定的新闻

> 参数

- **newsId**    &nbsp; *number* &nbsp; 新闻id。 **必须**

> 响应示例

    {"code": 2, "message": "success"}



### GET  /news/detail    获得指定新闻的详情

> 参数

- **newsId**    &nbsp; *number* &nbsp; 新闻id。 **必须**

> 响应示例

```json
{"code": 2, "message": "success", data: {...}}
```



### GET  /news/list    获得所有新闻的列表（分页）

> 参数

- **page**    &nbsp; *number*    页码，默认为1。 **可选**

> 响应示例

```json
{"code": 2, "message": "success", data: {...}}
```



### GET    /news/query    查询新闻

> 参数

- **newsId**      *number*  新闻编号。  **可选**
- **title**            *String*  标题。  **可选**
- **startDate**  *String*  开始日期。  **可选**
- **endDate**    *String*  截至日期。  **可选**
- **page**         &nbsp; *number*    页码，默认为1。 **可选**

> 响应示例

```json
{"code": 2, "message": "success", data: {...}}
```

---



### 栏目管理

#### GET  /news/column/list    获得新闻栏目的列表（分页）

> 参数

- **page**    &nbsp; *number*    页码，默认为1。 **可选**

> 响应示例

```json
{"code": 2, "message": "success", data: {...}}
```



#### GET  /news/column/all    获得所有新闻栏目的列表

> 响应示例

```json
{"code": 2, "message": "success", data: {...}}
```





#### POST &nbsp; /news/column/add &nbsp; 添加新闻栏目 

> 参数

- **columnName** &nbsp; *String* 栏目名称。 &nbsp; **必须**

  

> 响应示例

```json
{"code": 2, "message": "success"}
```



#### POST &nbsp; /news/column/update &nbsp; 修改指定的新闻栏目

> 参数

- **columnId**   *number*  栏目编号。 &nbsp; **必须**

- **columnName** &nbsp; *String* 栏目名称。 &nbsp; **必须**

  

> 响应示例

```json
{"code": 2, "message": "success"}
```



#### GET &nbsp; /news/column/delete &nbsp; 删除指定的新闻栏目

> 参数

- **columnId**    &nbsp; *number* &nbsp; 新闻id。 **必须**

> 响应示例

```json
{"code": 2, "message": "success"}
```



