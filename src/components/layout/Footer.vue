<template>
   <div class="footer row">
        <div class="col-lg-3">
            <img src="https://theme.hstatic.net/1000391844/1000931071/14/logo.png?v=139" alt="lo go" class="w-100">
        </div>
        <div class="col-lg-4">
            <div class="footer__title">
                Liên hệ
            </div>
            <div class="footer__contacts d-flex align-items-center ">
                <i class="fa-solid fa-phone footer__icon"></i>
                <span class="footer__text ms-4">0366176577</span>
            </div>
            <div class="footer__contacts d-flex align-items-center ">
                <i class="fa-regular fa-building footer__icon"></i>
                <span class="footer__text ms-4">71/8 3/2 Can Tho</span>
            </div>
            <div class="footer__contacts d-flex align-items-center ">
                <i class="fa-solid fa-envelope footer__icon"></i>
                <span class="footer__text ms-4">thienthanh17082001@gmail.com</span>
            </div>
            <ul class="footer__list">
                <li class="footer__item">
                    <a href="" class="footer__link">
                        <i class="fa-brands fa-facebook-square "></i>
                        Facebook
                    </a>
                </li>
                <li class="footer__item">
                    <a href="" class="footer__link">
                        <i class="fa-brands fa-instagram "></i>
                        Instagram
                    </a>
                </li>
                <li class="footer__item">
                    <a href="" class="footer__link">
                        <i class="fa-brands fa-github"></i>
                        Github
                    </a>
                </li>
            </ul>
        </div>
        <div class="col-lg-4">
            <div class="footer__title">
                Đăng ký nhận khuyến mãi
            </div>
            <div class="footer__sale">
                <input type="text" class="footer__input" placeholder="Nhập email tại đây...">
                <button class="footer__btn">Đăng ký</button>
            </div>
            <div class="admin mt-4">
                <router-link to="/admin/product" class="btn btn-lg btn-success" v-if="checkSeccsion()">Admin</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "footer-com",
    data(){
        return{
            
        }
    },
    methods:{
        checkSeccsion(){
      if(JSON.parse(sessionStorage.getItem('user'))){
        return JSON.parse(sessionStorage.getItem('user')).isAdmin
      }else{
        return false
      }
    },
    },
   
}
</script>
<style scoped>

</style>