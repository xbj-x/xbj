<template>
  <div>
    <!-- list -->
    <v-list @edit="edit"></v-list>

    <!-- form -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import { reqRoleList } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isshow: false,
      },
      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    // 编辑
    edit(id) {
      this.info = {
        isshow: true,
        title:'编辑会员'
      };
      this.$refs.form.getOne(id);
    },
  },
  mounted() {},
  components: {
    vList,
    vForm,
  },
};
</script>
<style scoped>
</style>