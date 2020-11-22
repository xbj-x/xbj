<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willadd">添加</el-button>

    <!-- list -->
    <v-list @edit="edit"></v-list>

    <!-- form -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vForm from "./components/form";
import vList from "./components/list";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加活动",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willadd() {
      this.info = {
        isshow: true,
        title: "添加活动",
      };
    },
    // 编辑
    edit(id) {
      this.info={
        title:'编辑活动',
        isshow:true
      }
      this.$refs.form.getOne(id);
    },
  },
  mounted() {},
  components: {
    vForm,
    vList,
  },
};
</script>
<style scoped>
</style>