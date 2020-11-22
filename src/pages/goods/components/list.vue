<template>
  <div>
    <!-- 23.list展示在页面 -->
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="商品编号" sortable></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable></el-table-column>
      <el-table-column label="图片" sortable>
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot===1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>

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
    <el-pagination background layout="prev, pager, next" 
      :total="total"
      :page-size="size"
      @current-change="changePage"
      ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
import { reqgoodsDel } from "../../../utils/http";
export default {
  computed: {
    ...mapGetters({
        list:"goods/list",
        total:"goods/total",
        size:"goods/size"
    }),
  },
  methods: {
    ...mapActions({
        reqList:"goods/reqList",
        reqCount:"goods/reqCount",
        changePage:"goods/changePage"
    }),
    del(id) {
      // 删除的请求
      reqgoodsDel(id).then(res => {
        if (res.data.code == 200) {
          // 成功的弹框
          successAlert("删除成功");
          this.reqList();
          this.reqCount()
        }
      });
    },
    // 34.编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
      this.reqList();
      this.reqCount();
  },
};
</script>
<style scoped>
img{
  width: 80px;
  height: 80px;
}
</style>