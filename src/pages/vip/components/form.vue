<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user" :rules="rules">
        <el-form-item label="手机号" label-width="120px" prop="phone">
          <el-input v-model="user.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="120px" prop="nickname">
          <el-input v-model="user.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="user.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px" prop="status">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqvipDetail, reqvipUpdate } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
      // 数据
      user: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList:'vip/reqList'
    }),
    cancel() {
      this.info.isshow = false;
    },
    //  获取详情
    getOne(id) {
      reqvipDetail(id).then((res) => {
        this.user = res.data.list;
        this.user.id = id
        this.user.password = '';
      });
    },
    empty() {
      this.user = {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    // 修改
    update() {
      reqvipUpdate(this.user).then(res=>{
        if (res.data.code === 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.reqList()
        }
      });
    },
    // 是否保存form上次写的数据
    closed() {
      if (this.info.title === "编辑会员") {
        this.empty();
      }
    },
  },
  mounted() {
    this.reqList()
  },
};
</script>
<style scoped>
</style>