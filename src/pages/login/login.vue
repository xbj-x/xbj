<template>
  <div class="login">
      <div class="con">
          <h3>登录</h3>
          <div class="line">
              <el-input v-model="user.username" placeholder="请输入账号" clearable></el-input>
          </div>
          <div class="line">
              <el-input v-model="user.password" placeholder="请输入密码" clearable show-password></el-input>
          </div>
          <div class="last">
              <el-button type="primary" @click="login">登录</el-button>
          </div>

      </div>
      
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex";
import { successAlert } from '../../utils/alert';
import { reqLogin } from '../../utils/http';
export default {
    computed: {
        ...mapGetters({})
    },
    methods: {
        ...mapActions({
            "changeUser":"changeUser"
        }),
        login(){
            reqLogin(this.user).then(res=>{
                if(res.data.code==200){
                    successAlert("登录成功")

                    // 存入vuex
                    this.changeUser(res.data.list)
                    this.$router.push("/")
                }
            })
        }
    },
    data() {
        return {
            user:{
                username:"",
                password:""
            }
        }
    },
    mounted() {
        
    },
}
</script>

<style scoped>
    .login{
        position: relative;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(to right,#543444,#403A53,#303D5F);
        text-align: center;
    }
    .con{
        width: 400px;
        background-color: #fff;
        padding: 40px 20px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 10px;
    }
    h3{
        margin: 10px;
    }
    .line{
        margin: 15px 0;
    }
</style>