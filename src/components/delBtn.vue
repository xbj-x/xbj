<template>
  <!-- 29.封装删除组件 -->
  <el-button type="danger" @click="del">删除</el-button>
</template>

<script>
export default {
  methods: {
    del() {
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 31.通知父组件，点了确定
          this.$emit("confirm");
        })
        .catch(() => {
          console.log("你点了取消");
        });
    },
  },
};
</script>

<style>
</style>