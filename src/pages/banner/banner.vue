<template>
  <div>
    <el-button type="parimary" @click="willAdd">添加</el-button>

    <v-list @edit="edit"></v-list>

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
        title: "添加轮播图",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加轮播图",
      };
    },
    edit(id) {
      this.info = {
        title: "编辑轮播图",
        isshow: true,
      };
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