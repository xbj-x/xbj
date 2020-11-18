<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号" sortable></el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable></el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column prop="url" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { errorAlert, successAlert } from '../../../utils/alert';
import { reqMenuDel } from '../../../utils/http';
export default {
  // 20.接收list
  props:["list"],
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    // 28.删除
    del(id){
      this.$confirm("你确定要删除吗？","删除提示",{
        confirmButtonText:"删除",
        cancelButtonText:"取消",
        type:"warning"
      })
      .then(()=>{
        // 删除的请求
        reqMenuDel(id).then(res=>{
          if(res.data.code==200){
            // 成功的弹框
            successAlert(res.data.msg)
            // 29.通知父组件刷新list
            this.$emit("init")
          }else{
            errorAlert(res.data.msg)
          }
        })
      })
      .catch(()=>{
        console.log('你点了取消');
        
      })
    },
    // 31.点了编辑按钮
    edit(id){
      // 通知父组件，要编辑了
      this.$emit("edit",id)
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>