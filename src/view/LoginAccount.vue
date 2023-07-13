<template>
  <div class="acounts container my-5">
    <div class="account__login">
      <div class="account__swap">
        <span class="swap__login account__swap--active">Đăng nhập</span>
        <router-link to="register" class="swap__register">Đăng ký</router-link>
      </div>
      <form action="/login" method="POST" class="login__form">
        <div class="account__email">
          <lable class="email__lable">Email</lable>
          <input
            type="email"
            class="email__input"
            name="email"
            placeholder="thanh@gmail.com"
            v-model="infoUser.email"
          />
         
        </div>
        <div class="account__password">
          <lable class="pass__lable">Password</lable>
          <input
            type="password"
            class="pass__input"
            name="password"
            placeholder="Mật khẩu"
            v-model="infoUser.password"
          />
          <span class="text-danger">{{ message }}</span>
        </div>
        <p class="account__btn text-center">
          <button @click.prevent.stop="login" class="btn__submit" id="btn__login">
            Đăng nhập
          </button>
        </p>
      </form>
      <div class="social d-flex justify-content-center">
        <div class="btn btn-danger me-4"><a href="http://localhost:3000/user/google"><i class="fa-brands fa-google"></i></a></div>
        <div class="btn btn-info"><i class="fa-brands fa-facebook"></i></div>
      </div>
      <p class="acount__message"></p>
    </div>
  </div>
</template>

<script>
import userService from '../services/user.service';
export default {
  data(){
    return{
      infoUser:{},
      message:''
    }
  },
  methods:{
    async login(){
      const result = await userService.login(this.infoUser);
      
     if(result.data != null){
      sessionStorage.setItem("user", JSON.stringify(result.data))
      this.$router.push({path:'/'})
     }else{
      
      this.message='Bạn nhập sai email hoặc mật khẩu'
      this.infoUser={}
     }
    },
  
  },
  mounted(){
    if(sessionStorage.getItem('user')){
      this.$router.push({path:'/'})
    }
  }
};
</script>

<style>
@import '../assets/css/account.css'

</style>
