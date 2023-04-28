<template>
  <div class="acounts container my-5">
    <div class="account__login">
      <div class="account__swap">
        <router-link to="/login" class="swap__login">Đăng nhập</router-link>
        <span class="swap__register account__swap--active">Đăng ký</span>
      </div>

      <form action="/register" method="POST" class="register__form">
        <div class="account__name">
          <lable class="email__lable">Họ và tên</lable>
          <input
            type="text"
            class="name__input"
            placeholder="Họ và tên"
            name="name"
            v-model="infoUser.name"
          />
          <span></span>
        </div>
        <div class="account__email">
          <lable class="email__lable">Email</lable>
          <input
            type="email"
            class="email__input"
            placeholder="thanh@gmail.com"
            name="email"
            v-model="infoUser.email"
          />
          <span></span>
        </div>
        <div class="account__password">
          <lable class="pass__lable">Mật khẩu</lable>
          <input
            type="password"
            class="pass__input"
            placeholder="Mật khẩu"
            name="password"
            v-model="infoUser.password"
          />
          <span></span>
        </div>
        <div class="account__password">
          <lable class="pass__lable">Nhập lại mật khẩu</lable>
          <input
            type="password"
            class="pass__input--retype"
            placeholder="nhập lại mật khẩu"
            name="passConfirm"
            v-model="infoUser.passConfirm"
          />
          <span class="text-success">{{ message }}</span>
          <span class="text-danger">{{ warning }}</span>
        </div>
        <p class="account__btn text-center">
          <button @click.prevent.stop="createAccount" class="btn__submit" id="btn__register">
            Đăng ký
          </button>
        </p>
      </form>
      <p class="acount__message"></p>
    </div>
  </div>
</template>

<script>
import userService from '../services/user.service'
export default {
  data(){
    return {
      infoUser:{},
      message:'',
      warning:''
    }
  },
  methods:{
    async createAccount(){
      if(this.infoUser.password == this.infoUser.passConfirm){
        const result = await userService.register(this.infoUser)
        if(result.status==200 ){

          this.message='Đăng kí thành công hãy đăng nhập'
          this.warning=''
        }
      }else{
        this.warning='Mật khẩu ko trùng khớp'
        this.message=''
      }
    }
  }
};
</script>

<style></style>
