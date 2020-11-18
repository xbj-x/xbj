<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list :list="list" @init="init" @edit="edit"></v-list>

    <!-- 传递info给form -->
    <v-form :info="info" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqRoleList } from '../../utils/http';
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
        title: "添加角色",
      },
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
        title:"添加角色"
      }
    },
    // 发请求
    init(){
      reqRoleList().then(res=>{
        this.list=res.data.list
      })
    },
    // 36.编辑
    edit(id){
      this.info={
        isshow:true,
        title:"编辑角色"
      }
      this.$refs.form.getOne(id)
    }
  },
  mounted() {
    // 20.一进来发请求
    this.init()
  },
};
</script>
<style scoped>
</style>