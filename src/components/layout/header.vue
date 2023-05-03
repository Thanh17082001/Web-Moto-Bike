<template>
  <header class="header d-flex justify-content-between align-items-center">
    <div class="nav__logo">
      <img
        src="https://gudlogo.com/wp-content/uploads/2019/04/logo-chu-T-logot.jpg"
        alt="lo go"
        class="logo__image"
      />
    </div>
    <nav class="nav justify-content-between">
      <ul class="nav__list d-flex justify-content-between">
        <li class="nav__item">
          <router-link
            to="/"
            class="nav__link"
            active-class="nav__link--active"
            exact
          >
            Trang chủ</router-link
          >
        </li>
        <li class="nav__item d-flex justify-content-between align-items-center">
          <router-link
            to="/product"
            class="nav__link me-2"
            active-class="nav__link--active"
            >Sản phẩm <i class="fa-sharp fa-solid fa-caret-down nav__icon"></i
          ></router-link>

          <div class="nav__dropdown">
            <ul class="dropdown__list">
              <li class="dropdown__item">
                <a href="" class="dropdown__link">Xe tay ga</a>
              </li>
              <li class="dropdown__item">
                <a href="" class="dropdown__link">Xe tay côn</a>
              </li>
              <li class="dropdown__item">
                <a href="" class="dropdown__link">Xe Số</a>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav__item">
          <router-link to="/news" class="nav__link">Tin tức</router-link>

        </li>
        <li class="nav__item">
          <router-link to="/introduce" class="nav__link"
            >Giới thiệu</router-link
          >
        </li>
        <li class="nav__item">
          <router-link to="/history-order" class="nav__link me-2">Đơn hàng</router-link>

        </li>
      </ul>
    </nav>
    <div class="search">
      <input
        type="text"
        class="search__input"
        placeholder="Tìm kiếm sản phẩm..."
        v-model="inputSearch"
      />
      <button class="search__btn" @click="searchPage">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
    <div class="nav__right d-flex justify-content-between">
      <div class="nav__account user__setting">
        <i class="fa-solid fa-user account__option" ></i>
        <ul class="setting__option setting__option-overlay" >
          <li class="setting__item">
              <span class="fs-5" v-if="token">{{ checkSeccsion() }}</span>
              <router-link to="/login"  v-if="!checkSeccsion()" class="setting__link">
                <i class="fa-solid fa-pen-to-square"></i> Đăng nhập</router-link
              >
              <router-link to="/register" v-if="!token" class="setting__link">
                <i class="fa-regular fa-registered me-2"></i>Đăng kí    </router-link
              >
              <router-link to="/admin/product" v-if="isAdmin" class="setting__link">
                <i class="fa-regular fa-registered"></i>Quản trị</router-link
              >
              <span @click.prevent.stop="logout" class="setting__link">
                <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất</span
              >
              
            </li>
          </ul>
      </div>
      <router-link to="/cart" class="nav__cart ">
        <span class="cart__count">{{ cartCount }}</span>
        <i class="fa-solid fa-cart-shopping"></i>
      </router-link>
    </div>
  </header>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
  name: "header-com",
  watch:{
    "token"(){
      this.checkSeccsion()
    }
  },
  data() {
    return {
      cartCount:0,
      inputSearch:'',
      token:false,
      isAdmin:false
    };
  },
 
  methods:{
   
    searchPage(){
      if(this.inputSearch==''){
        alert('Chưa nhập từ khóa tìm kiếm')
      }else{

        this.$router.push({name:'product.search',params:{searchString:this.inputSearch}})
      }
    },
    checkSeccsion(){
      const getUser=JSON.parse(sessionStorage.getItem('user'))
      if(getUser){
        this.token=true
        if(getUser.isAdmin){
          this.isAdmin=true
        }
        return getUser.name
      }else{
        this.token=false
        this.isAdmin=false
        return false
      }
    },
    logout(){
      const instance = getCurrentInstance();
      if(JSON.parse(sessionStorage.getItem('user'))){
        sessionStorage.removeItem('user');
        alert('Đăng xuất thành công')
        this.checkSeccsion()
        instance.proxy.$forceUpdate(); 
      }else{
        alert('bạn chưa đăng nhập tài khoản')
      }
    },
    cartItems(){
      this.getItem=JSON.parse(sessionStorage.getItem('cart'))
      if(this.getItem){
        this.cartCount= this.getItem.length
      }
    }
  },
 
  
};
</script>
<style scoped>
@import "../../assets/css/layout.css";
.setting__option-overlay{
   right: 0;
   z-index: 10;
   display: none;
   min-width: 180px;
}
.nav__account:hover .setting__option-overlay{
  display: block;
  
}
.nav__account{
  position: relative;
}
.nav__account::before{
  content: "";
  position: absolute;
  width: 70px;
  height: 30px;
  top: 19px ;
  right: 0;
  cursor: pointer;
}
.nav__account::before:hover .setting__option-overlay{
  display: block;
}
.logo__image{
  width: 150px;
  height: 80px;
  margin-left: 20px;
}
</style>
