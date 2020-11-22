<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed" :rules="rules">
      <!-- el-dialog会使用display:block;所以rules会先验证,所以使用v-if="info.isshow" -->
      <el-form :model="user" :rules="rules" v-if="info.isshow">
        <el-form-item label="活动名称" label-width="120px" prop="title">
          <el-input v-model="user.title" placeholder="请输入活动名称"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" required class="form">
          <el-date-picker
            v-model="value"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="120px">
          <el-select placeholder="请选择一级分类" v-model="user.first_cateid" @change="changeFirst">
            <!-- 6.遍历一级分类 -->

            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select placeholder="请选择二级分类" v-model="user.second_cateid" @change="changeSecond">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="120px">
          <el-select placeholder="请选择商品" v-model="user.goodsid">
            <el-option
              v-for="item in thirdCateList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加活动'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { errorAlert, successAlert } from "../../../utils/alert";
import E from "wangeditor";
import {
  reqseckAdd,
  reqseckDetail,
  reqgoodsList,
  reqseckUpdate,
  reqcateList,
  reqCateDetail,
} from "../../../utils/http";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
      user: {
        first_cateid: "",
        second_cateid: "",
        title: "",
        begintime: "",
        endtime: "",
        goodsid: "",
        status: 1,
      },
      value: [],
      secondCateList: [],
      thirdCateList: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      goodsList: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "seckill/reqList",
      reqcatelist: "cate/reqList",
      reqgoodsList: "goods/reqList",
      reqseckList:'seckill/reqList'
    }),
    check() {
      return new Promise((resolve, reject) => {
        if (this.user.title === "") {
          errorAlert("请输入活动名称");
          return;
        }
        if (this.user.begintime === "") {
          errorAlert("请输入开始时间");
          return;
        }
        if (this.user.endtime === "") {
          errorAlert("请输入终止时间");
          return;
        }
        resolve();
      });
    },
    add() {
      this.user.begintime = this.value[0];
      this.user.endtime = this.value[1];
      this.check().then(() => {
        reqseckAdd(this.user).then((res) => {
          if (res.data.code === 200) {
            successAlert("添加成功");
            this.empty();
            this.cancel();
            this.reqList();
          }
        });
      });
    },
    // 获取表格的信息并渲染
    getOne(id) {
      reqseckDetail(id).then((res) => {
        this.value = [
          new Date(Number(res.data.list.begintime)),
          new Date(Number(res.data.list.endtime)),
        ];
        
        this.user = res.data.list;
        this.user.id = id
        this.getSecondList();
        this.getThirdList();
      });
    },
    // 修改信息
    update() {
      this.check().then(() => {
        this.user.begintime = Number(this.user.begintime)
        this.user.endtime = Number(this.user.endtime)
        reqseckUpdate(this.user).then((res) => {
          if(res.data.code===200){
            successAlert(res.data.msg)
            this.reqseckList()
            this.empty()
            this.cancel()
          }
        });
      });
    },
    changeFirst() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqcateList({ pid: this.user.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    changeSecond() {
      this.user.goodsid = "";
      this.getThirdList();
    },
    getThirdList() {
      let obj = this.goodsList.filter(
        (item) => item.second_cateid === this.user.second_cateid
      );
      this.thirdCateList = obj;
    },
    empty() {
      this.user = {
        first_cateid: "",
        second_cateid: "",
        title: "",
        begintime: "",
        endtime: "",
        goodsid: "",
        status: 1,
      };
      this.value = [];
      this.secondCateList = [];
    },
    cancel() {
      this.info.isshow = false;
    },
    closed() {
      if (this.info.title == "编辑活动") {
        this.empty();
      }
    },
  },
  mounted() {
    this.reqList();
    this.reqcatelist();
    this.reqgoodsList(true);
  },
};
</script>
<style scoped>
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.form {
  display: flex;
}
.line .el-button {
  width: auto;
}
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
</style>
