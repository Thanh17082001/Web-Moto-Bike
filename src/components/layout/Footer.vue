<template>
   <div class="footer row">
        <div class="col-lg-3">
            <img src="https://gudlogo.com/wp-content/uploads/2019/04/logo-chu-T-logot.jpg" alt="lo go" class="logo__image-footer">
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
        </div>
    </div>
</template>

<script>
export default {
    name: "footer-com",
   
   
}
</script>
<style scoped>
.logo__image-footer{
    width: 160px;
    height: 80px;
    margin:30px 0px 0px 70px;
}
</style>