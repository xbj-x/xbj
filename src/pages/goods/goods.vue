<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list @edit="edit"></v-list>

    <!-- 传递info给form -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
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
        title: "添加商品",
      },
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
        title:"添加商品"
      }
    },
    // 36.编辑
    edit(id){
      this.info={
        isshow:true,
        title:"编辑商品"
      }
      this.$refs.form.getOne(id)
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>