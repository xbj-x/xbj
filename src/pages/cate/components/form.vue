<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="user.pid" placeholder="请选择角色">
            <el-option :value="0" label="顶级分类"></el-option>
            <!-- 23.list遍历 -->
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" v-if="user.pid!==0" label-width="120px" >
         <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile2"
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
        <el-button type="primary" @click="add" v-if="info.title==='添加分类'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import path from "path";
import { mapGetters, mapActions } from "vuex";
import { reqcateAdd, reqcateDetail, reqcateUpdate,reqRoleList } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  // 接收info 接收list
  props: ["info"],
  data() {
    return {
      user: {
        pid:"",
        catename:"",
        img:null,
        status:1
      },
      imgUrl:"",
    };
  },
  computed: {
    ...mapGetters({
      cateList:"cate/list"
    }),
  },
  methods: {
    // 3.选择了文件
    changeFile(e){
      let file=e.target.files[0];

      // 判断文件大小  file.size B ，1M=1024k 1k=1024b
      if(file.size>2*1024*1024){
        errorAlert("文件大小不能超过2M");
        return;
      }

      // 判断文件类型
      let extname=path.extname(file.name);//'.jpg'
      let arr=[".jpg",".jpeg",".png",".gif"]
      if(!arr.includes(extname)){
        errorAlert("请上传正确的图片格式！")
        return;
      }

      //URL.createObjectURL(file)将一个文件生成一个URL地址
      this.imgUrl=URL.createObjectURL(file)

      // 给user.img赋值
      this.user.img=file;
    },

    //element-ui的上传文件
    changeFile2(e){
      let file=e.raw;


      this.imgUrl=URL.createObjectURL(file)

      this.user.img=file;
    },


    ...mapActions({
      reqList:"cate/reqList"
    }),

    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        pid: "",
        catename:"",
        img:null,
        status: 1,
      };
      this.imgUrl="";
    },
    add() {
      // 发起添加的请求
      reqcateAdd(this.user).then((res) => {
        if (res.data.code === 200) {
          // 弹框显示成功
          successAlert("添加成功");
          // 弹框消失
          this.cancel();
          // 数据清空
          this.empty();
          // 刷新list
          this.reqList();
        }
      });
    },
    // 36.获取一条数据
    getOne(id) {
      reqcateDetail(id).then((res) => {
        // user没有id
        this.user = res.data.list;

        this.imgUrl=this.$imgPre+this.user.img;
        // 补id
        this.user.id = id;
      });
    },
    //37 点了修改
    update() {
      reqcateUpdate(this.user).then((res) => {
        if (res.data.code === 200) {
          //成功弹框
          successAlert("修改成功");
          //弹框消失
          this.cancel();
          //form重置
          this.empty();
          //列表刷新
          this.reqList();
        }
      });
    },
    //38.弹框消失
    closed() {
      // 如果是添加出现，点击了取消，此时，什么都不做
      // 如果是编辑出现，点击了取消，此时，form置空
      if (this.info.title === "编辑分类") {
        this.empty();
      }
    },
  },
  mounted() {
    // 一进来先获取列表数据
    reqRoleList().then(res=>{
      if(res.data.code==200){
        this.roleList=res.data.list;
      }
    })
  },
};
</script>
<style scoped lang="stylus">
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

  // 穿透
 .add >>> .el-upload {
    border: 1px dashed #d9d9d9 ;
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
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>