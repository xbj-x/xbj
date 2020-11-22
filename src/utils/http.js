import axios from "axios"
import qs from "qs"
import router, { routes } from "../router"
import store from "../store"
import { errorAlert } from "./alert"
import Vue from "vue"

// 开发环境使用 8080
let baseUrl = "/aa"
Vue.prototype.$imgPre="http://localhost:3000"

// 生产环境使用 打包
// let baseUrl=""


// 响应拦截
axios.interceptors.response.use(res => {
    console.log("本次请求地址是：" + res.config.url);
    console.log(res);
    // 13.统一处理失败，组件内只需要处理成功即可
    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }
    if(res.data.msg==="登录已过期或访问权限受限"){//掉线了
        // 清除登录信息
        store.dispatch("changeUser",{})
        // 跳转到登录页
        router.push("/login")
    }
    return res
})


// 请求拦截
axios.interceptors.request.use(req=>{
    if(req.url!=baseUrl+"/api/userlogin"){
        req.headers.authorization=store.state.userInfo.token;
    }
    return req
})



// 1.登录
export const reqLogin=(user)=>{
    return axios({
        url:baseUrl+"/api/userlogin",
        method:"post",
        data:qs.stringify(user)
    })
}



// ==========菜单接口 开始================
// 13.添加
export const reqMenuAdd = (form) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(form)
    })
}

// 18.列表交互
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}
// 29.删除
export const reqMenuDel = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}
// 35.获取一条数据
export const reqMenuDetail = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
//38.修改
export const reqMenuUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(form)
    })
}

// ==========菜单接口 结束================


// ==========角色接口 开始================


// 8.添加
export const reqRolAdd = (user) => {
    return axios({
        url: baseUrl + "/api/roleAdd",
        method: "post",
        data: qs.stringify(user)
    })
}

// 18.列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    })
}

// 26.删除
export const reqRoleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqRoleDetail = id => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 修改
export const reqRoleUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(user)
    })
}
// ==========角色接口 结束================

// ==========管理员接口 开始================

// 8.添加
export const reqUserAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })
}



// 18.列表 p={page:1,size:10}
export const reqUserList = (p) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: p
    })
}

// 26.删除
export const reqUserDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({
            uid: uid
        })
    })
}

// 33.详情
export const reqUserDetail = uid => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}


// 38.修改
export const reqUserUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}

export const reqUserCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",
    })
}

// ==========管理员接口 结束================


// ==========分类接口 开始================
// 添加
export const reqcateAdd=(cate)=>{
    // cate={name:12,img:File,age:20}
    let d=new FormData()
    /*
    d.append("name",12)
    d.append("img",file)
    d.append("age",20)
    */ 

    for(let i in cate){
        d.append(i,cate[i])
    }
    return axios({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data:d
    })
}

// 列表 p={istree:true}  p{pid:1}
export const reqcateList=(p)=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:"get",
        params:p
    })
}

// 删除
export const reqcateDel=(id)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

// 详情
export const reqcateDetail=id=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params:{
            id:id
        }
    })
}


// 修改  文件
export const reqcateUpdate=(cate)=>{
    let d=new FormData()
    for(let i in cate){
        d.append(i,cate[i])
    }
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:d
    })
}

// ==========分类接口 结束================

// ==========规格接口 开始================

// 8.添加
export const reqspecsAdd = (user) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)
    })
}



// 18.列表 p={page:1,size:10}
export const reqspecsList = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: p
    })
}

// 26.删除
export const reqspecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqspecsDetail = uid => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}


// 38.修改
export const reqspecsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}

export const reqspecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}

// ==========规格接口 结束================



// ==========商品管理 开始================
// 添加 
export const reqgoodsAdd = (user) => {
    let d=new FormData()
    for(let i in user){
        d.append(i,user[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data:d
    })
}
//列表 p={page:1,size:10}
export const reqgoodsList = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: p
    })
}

//删除
export const reqgoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

//详情
export const reqgoodsDetail = id => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
// 修改
export const reqgoodsUpdate = (user) => {
    let d=new FormData()
    for(let i in user){
        d.append(i,user[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: d
    })
}
export const reqgoodsCount = () => {
   
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}

// ==========商品管理 结束================



// ===========会员管理 开始====================

// 请求会员列表
export const reqvipList = () => {
    return axios({
        url: baseUrl + '/api/memberlist',
        method: 'get'
    })
}

// 会员获取
export const reqvipDetail = (uid) => {
    return axios({
        url: baseUrl + '/api/memberinfo',
        method: 'get',
        params: {
            uid: uid
        }
    })
}

// 会员的修改
export const reqvipUpdate = (user) => {
    return axios({
        url: baseUrl + '/api/memberedit',
        method: 'post',
        data: qs.stringify(user)
    })
}

// ===========会员管理 结束====================


// ===========轮播图 开始====================

// 8.添加 文件
export const reqbannerAdd = (user) => {
    let d = new FormData()
    for (let i in user) {
        d.append(i, user[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: d
    })
}

//18.列表
export const reqbannerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get"
    })
}

//26.删除
export const reqbannerDel = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqbannerDetail = id => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 38.修改 文件
export const reqbannerUpdate = (user) => {
    let d = new FormData();
    for (let i in user) {
        d.append(i, user[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: d
    })
}


// ===========轮播图 结束====================


// ===========秒杀 开始====================

// 8.添加
export const reqseckAdd = (user) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//18.列表 
export const reqseckList = () => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get",
    })
}

//26.删除
export const reqseckDel = (id) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqseckDetail = id => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 38.修改 要id
export const reqseckUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(user)
    })
}

// ===========秒杀 结束====================