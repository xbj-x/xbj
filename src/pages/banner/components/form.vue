<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user" :rules="rules">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="user.title"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加轮播图'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert,errorAlert } from "../../../utils/alert";
import {
  reqbannerAdd,
  reqbannerDetail,
  reqbannerUpdate,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqList",
    }),
    check() {
      return new Promise((resolve, reject) => {
        if (this.user.title === "") {
          errorAlert("请选择一级分类");
          return;
        }
        if(!this.user.img){
          errorAlert('请选择图片')
          return;
        }
        resolve();
      });
    },
    empty() {
      this.user = {
        title: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    closed() {
      if ((this.info.title = "编辑轮播图")) {
        this.empty();
      }
    },
    cancel() {
      this.info.isshow = false;
    },
    getOne(id) {
      reqbannerDetail(id).then((res) => {
        this.user = res.data.list;
        this.imgUrl = this.$imgPre + this.user.img;
        this.user.id = id;
      });
    },
    changeFile(e) {
      let file = e.raw;
      // 将一个文件生成一个URL地址
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    update() {
      this.check().then((res) => {
        reqbannerUpdate(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.cancel();
            this.empty();
            this.reqList();
          }
        });
      });
    },
    add() {
      this.check().then((res) => {
        reqbannerAdd(this.user).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            this.cancel();
            this.reqList();
          }
        });
      });
    },
  },
  mounted() {},
};
</script>
<style scoped lang="stylus">
.myupload {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}

.myupload h3 {
  width: 100%;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  color: #666;
  font-weight: 100;
}

.myupload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.myupload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}

/* 穿透 */
.box >>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar-uploader .el-upload img {
  width: 100px;
  height: 100px;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>