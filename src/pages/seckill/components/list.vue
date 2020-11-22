<template>
  <div>
   <div>
      <!-- 23.list展示在页面 -->
      <el-table
        :data="list"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{children: 'children'}"
      >
        <el-table-column prop="title"  label="活动名称" sortable></el-table-column>
        
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <!-- 32.绑定confirm事件 -->
            <del-btn @confirm="del(scope.row.id)"></del-btn>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
import { reqseckDel } from "../../../utils/http";
export default {
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },

  methods: {
    ...mapActions({
      reqList: "seckill/reqList",
    }),
    // 删除
    del(id) {
      reqseckDel(id).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.reqList();
        }
      });
    },
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.reqList();
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 80px;
}
</style>