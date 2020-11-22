import {reqspecsList,reqspecsCount} from "../../utils/http"

const state={
    // 分类list
    list:[],
    // 总数
    total:0,
    size:2,
    page:1,
}

const mutations ={
    // 修改list
    changeList(state,arr){
        state.list=arr;
        console.log(state.list);
    },
    changeTotal(state,num){
        state.total=num;
    },
    changePage(state,page){
        state.page=page;
    }
}

const actions={
    // 发起请求
    reqList(context,bool){
        // 修改条件
        let params=bool?{}:{page:context.state.page,size:context.state.size}
        // 发请求，成功之后，修改list
        reqspecsList(params).then(res=>{
            let list=res.data.list?res.data.list:[]

            if(list.length==0&&context.state.page>1){
                context.commit("changePage",context.state.page-1)
                context.dispatch("reqList");
                return;
            }

            // attrs JSON.parse()
            list.forEach(item=>{
                item.attrs=JSON.parse(item.attrs)
            })
            context.commit("changeList",list)
        })
    },
    // 请总数
    reqCount(context){
        reqspecsCount().then(res=>{
            context.commit("changeTotal",res.data.list[0].total)
        })
    },
    // 修改页码
    changePage(context,page){
        // 修改页码
        context.commit("changePage",page)
        // 从新请求数据
        context.dispatch("reqList")
    }
}

const getters={
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    },
}

export default{
    state,mutations,getters,actions,
    namespaced: true
}