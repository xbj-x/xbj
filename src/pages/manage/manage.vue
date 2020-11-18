<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list :list="list" @init="newInit" @edit="edit"></v-list>

    <!-- 分页 
    total:总条数
    page-size:一页的数量
    current-change：当前页码发生了修改，会触发，回调函数的参数就是新的页码
    -->
    <el-pagination background @current-change="changePage" layout="prev,pager,next" :total="total" :page-size="size"></el-pagination>




    <!-- 传递info给form -->
    <v-form :info="info" @init="newInit" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqUserList,reqUserCount } from '../../utils/http';
export default {
  components: {
    vList,
    vForm,
  },
  data() {
    return {
      // 弹框初始值
      info: {
        isshow: false,
        title: "添加管理员",
      },
      total:0,//总数
      size:3,//一页的数量
      page:1,//页码

      // 19.列表数据初始化
      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    // 5.点击了添加按钮
    willAdd(){
      this.info={
        isshow:true,
        title:"添加管理员"
      }
    },
    // 发请求
    init(){
      reqUserList({page:this.page,size:this.size}).then(res=>{
        let list=res.data.list?res.data.list:[]

        // 56.如果取到的list是[]，并且page>1，page自减，请列表
        if(list.length===0&&this.page>1){
          this.page--;
          this.init();
          return;
        }
        this.list=list;
      })
    },
    // 获取总数
    getCount(){
      reqUserCount().then(res=>{
        this.total=res.data.list[0].total
      })
    },
    // 36.编辑
    edit(uid){
      this.info={
        isshow:true,
        title:"编辑管理员"
      }
      this.$refs.form.getOne(uid)
    },
    // 页码发生了修改
    changePage(page){
      this.page=page;
      this.init()
    },
    // 请list，请总数
    newInit(){
      this.init()
      this.getCount()
    }
  },
  mounted() {
    // 20.一进来发请求
    this.init();
    // 请求总数
    this.getCount()
  },
};
</script>
<style scoped>
</style>