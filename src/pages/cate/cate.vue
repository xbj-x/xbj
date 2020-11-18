<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" class="tianjia" @click="willAdd">添加</el-button>

    <!-- table -->
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>

    <!-- 弹框 -->
    <v-form :info="info" :list="list" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqMenuList } from "../../utils/http";
export default {
  data() {
    return {
      // 16.列表数据
      list: [],
      // 1.弹框的状态
      info: {
        isshow: false,
        title:"添加菜单"
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info.isshow = true;
      this.info.title="添加菜单"
    },
    init() {
      reqMenuList().then((res) => {
        this.list = res.data.list;
      });
    },
    // 33.处理编辑
    edit(id) {
      // 弹框出现
      this.info.isshow = true;
      // 34.给info补了一个字段，用来判断是添加还是编辑打开的弹框
      this.info.title = "编辑菜单";
      // 37.父组件调用子组件form.vue的getOne（）
      this.$refs.form.getOne(id);
    },
  },
  mounted() {
    this.init();
  },
  components: {
    vList,
    vForm,
  },
};
</script>
<style scoped>
.tianjia {
  margin-bottom: 20px;
}
</style>