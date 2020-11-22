<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @opened="opened" @closed="closed">
      <!-- el-dialog会使用display:block;所以rules会先验证,所以使用v-if="info.isshow" -->
      <el-form :model="user" :rules="rules" v-if="info.isshow">
        <!-- 2.绑定数据 -->
        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
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
        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select placeholder="请选择二级分类" v-model="user.second_cateid">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="120px" prop="goodsname">
          <el-input v-model="user.goodsname" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px" prop="price">
          <el-input v-model="user.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px" prop="market_price">
          <el-input v-model="user.market_price" placeholder="请输入市场价格"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <!-- 上传文件 -->
          <div class="myupload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt />

            <input v-if="info.isshow" type="file" class="ipt" @change="changeFile" />
          </div>
        </el-form-item>
        <el-form-item label="商品规格" label-width="120px" prop="specsid">
          <!-- 11.遍历 -->
          <el-select placeholder="请选择商品规格" v-model="user.specsid" @change="changeSpecsId">
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" prop="specsattr">
          <el-select placeholder="请选择二级分类" v-model="user.specsattr" multiple>
            <el-option v-for="item in attrsList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="120px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <!-- 富文本编辑器 -->

          <div v-if="info.isshow" id="edit"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加商品'" @click="add">添 加</el-button>
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
  reqgoodsAdd,
  reqgoodsUpdate,
  reqgoodsDetail,
  reqcateList,
} from "../../../utils/http";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      rules: {
        first_cateid: [
          { required: true, message: "请输入一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请输入二级分类", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入商品市场价格", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请输入商品规格", trigger: "change" },
        ],
        specsattr: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个规格属性",
            trigger: "change",
          },
        ],
      },
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      // 图片路径
      imgUrl: "",
      // 承接第二分类
      secondCateList: [],
      //规格属性list
      attrsList: [],
    };
  },
  computed: {
    ...mapGetters({ cateList: "cate/list", specsList: "specs/list" }),
  },
  methods: {
    ...mapActions({
      reqcateList: "cate/reqList",
      reqspecsList: "specs/reqList",
      reqgoodsList: "goods/reqList",
      reqgoodsCount: "goods/reqCount",
    }),
    check() {
      return new Promise((resolve, reject) => {
        if (this.user.first_cateid === "") {
          errorAlert("请选择一级分类");
          return;
        }
        if (this.user.second_cateid === "") {
          errorAlert("请选择二级分类");
          return;
        }
        if (this.user.goodsname === "") {
          errorAlert("请输入商品名称");
          return;
        }
        if (this.user.price === "") {
          errorAlert("请输入价格");
          return;
        }
        if ((this.user.market_price === "")) {
          errorAlert("请输入市场价格");
          return;
        }
        if (!this.user.img) {
          errorAlert("请选择图片");
          return;
        }
        if (this.user.specsid === "") {
          errorAlert("请选择商品规格");
          return;
        }
        if (this.user.specsattr.length === 0) {
          errorAlert("请选择商品属性");
          return;
        }
        if (this.editor.txt.html() === "") {
          errorAlert("请输入商品描述");
          return;
        }
        resolve();
      });
    },
    add() {
      this.check().then(() => {
        this.user.description = this.editor.txt.html();
        let d = { ...this.user };
        d.specsattr = JSON.stringify(d.specsattr);

        reqgoodsAdd(d).then((res) => {
          if (res.data.code === 200) {
            successAlert("添加成功");
            this.empty();
            this.cancel();
            this.reqgoodsList();
            this.reqgoodsCount();
          }
        });
      });
    },
    opened() {
      this.editor = new E("#edit");
      this.editor.create();
      this.editor.txt.html(this.user.description);
    },
    changeSpecsId() {
      this.user.specsattr = [];
      this.getAttrs();
    },
    getAttrs() {
      let obj = this.specsList.find((item) => item.id === this.user.specsid);
      this.attrsList = obj.attrs;
    },
    // 获取表格的信息并渲染
    getOne(id) {
      reqgoodsDetail(id).then((res) => {
        this.user = res.data.list;
        this.user.id = id;
        this.getSecondList();
        this.imgUrl = this.$imgPre + this.user.img;
        this.user.specsattr = JSON.parse(this.user.specsattr);
        this.getAttrs();
        if (this.editor) {
          this.editor.txt.html(this.user.description);
        }
      });
    },
    // 修改信息
    update() {
      this.check().then(() => {
        this.user.description = this.editor.txt.html();
        let d = { ...this.user };
        d.specsattr = JSON.stringify(d.specsattr);
        reqgoodsUpdate(d).then((res) => {
          if (res.data.code == 200) {
            successAlert("修改成功");
            this.empty();
            this.reqgoodsList();
            this.cancel();
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
    changeFile(e) {
      let file = e.target.files[0];
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    empty() {
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      // 图片路径
      this.imgUrl = "";
      // 承接第二分类
      this.secondCateList = [];
      //规格属性list
      this.attrsList = [];
    },
    cancel() {
      this.info.isshow = false;
    },
    closed() {
      if (this.info.title == "编辑商品") {
        this.empty();
      }
    },
  },
  mounted() {
    this.reqcateList();
    this.reqspecsList(true);
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
