<template>
  <section class="col-lg-3 sec__left">
    <ul class="sec-left__list">
      <li class="sec-left__user">
        <span class="user__avt"><i class="fa-solid fa-user"></i></span>
        <span class="user__name">
          Quản trị viên
          <p>Administrator</p>
        </span>
        <span class="user__setting" @click="toggleSetting">
          <i class="fa-solid fa-gear"></i>
          <ul class="setting__option" v-if="activeSetting">
            <li class="setting__item">
              <router-link to="/" class="setting__link">
                <i class="fa-solid fa-right-from-bracket"></i> Quay lại user</router-link
              >
             
            </li>
          </ul>
        </span>
      </li>
      <li class="sec-left__menu">
        <p>Menu</p>
      </li>
      <li class="sec-left__item">
        <router-link
          to="/admin/product"
          class="sec-left__link"
          active-class="active"
          exact
        >
          <i class="fa-brands fa-product-hunt icon1" id="icon1"></i>
          Sản phẩm
        </router-link>
      </li>
      <li class="sec-left__item">
        <router-link
          to="/admin/add"
          class="sec-left__link"
          active-class="active"
        >
          <i class="fa-solid fa-plus icon1" active-class="active" id="icon2"></i>
          Thêm sản phẩm
        </router-link>
      </li>
      <li class="sec-left__item">
        <router-link to="/admin/news"  active-class="active" class="sec-left__link">
          <i class="fa-regular fa-newspaper" id="icon3"></i>
          Đăng tin tức
        </router-link>
      </li>
      <li class="sec-left__item">
        <router-link to="/admin/statistical"  active-class="active" class="sec-left__link">
          <i class="fa-solid fa-chart-line" id="icon4"></i>
          Thông kê
        </router-link>
      </li>
      <li class="sec-left__item">
        <router-link to="/admin/order"  active-class="active" class="sec-left__link">
          <i class="fa-solid fa-cart-flatbed-suitcase" id="icon5"></i>
          Đơn hàng
        </router-link>
      </li>

      <li class="sec-left__item">
        <router-link to="/admin/trash"  active-class="active" class="sec-left__link" 
          exact>
          <i class="fa-solid fa-trash"></i>
          Thùng rác
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "admin-menu",
  data() {
        return {
            activeSetting: false
        }
    },
    methods: {
        toggleSetting() {
            this.activeSetting = !this.activeSetting
            console.log(this.activeSetting)
        }
    }
};
</script>

<style></style>