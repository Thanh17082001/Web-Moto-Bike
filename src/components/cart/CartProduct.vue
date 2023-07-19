<template>
  <div class="cart__content">
    <div class="row cart__headding fw-bold">
      <div class="col-lg-2 text-center">
        <span class="headding__img">Giá</span>
      </div>
      <div class="col-lg-4 text-center">
        <span class="headding__name">Tên sản phẩm</span>
      </div>
      <div class="col-lg-2 text-center">
        <span class="headding__price">Giá</span>
      </div>
      <div class="col-lg-2 text-center">
        <span class="headding__quantity">Số lượng</span>
      </div>
      <div class="col-lg-2 text-center">
        <span class="headding__delete">Xóa</span>
      </div>
    </div>
    <div class="cart__body">
      <div class="row" v-for="itemCart in listCart" :key="itemCart._id">
        <div class="col-lg-2 text-center h-75">
          <img :src="itemCart.imgUrl" alt="" class="body__img" />
        </div>
        <div class="col-lg-4 mt-4">
          <span class="body__name">{{ itemCart.name }}</span>
        </div>
        <div class="col-lg-2 mt-4 text-center">
          <span class="info__price">{{ formatCurrency(itemCart.price) }}</span>
        </div>
        <div class="col-lg-2 mt-4 text-center">
          <a class="quanlity__cart">
            <span hidden id="id2"></span>
            <input
              type="button"
              class="quanlity__change"
              value="-"
              @click="(event) => ChangeQuanlityCart(itemCart, event)"
            />
            <input
              type="text"
              class="body__quantity"
              :value="itemCart.quanlityOrder"
              minlength="1"
              min="1"
            />
            <input
              minlength="1"
              type="button"
              class="quanlity__change"
              value="+"
              @click="(event) => ChangeQuanlityCart(itemCart, event)"
            />
          </a>
        </div>
        <div class="col-lg-2 mt-4 text-center">
          <a @click.prevent.stop="deleteCartItem(itemCart)" class="body__delete"
            ><i class="fa-solid fa-trash"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productServices  from '../../services/product.services';
export default {
  props:{
    listCart:{}
  },
  emits:['changeQuanlity','deleteitemCart'],
  methods: {
    formatCurrency(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    async ChangeQuanlityCart(itemCart, e) {
      const getItem = this.$cookies.get("cart");
      const index = this.isProductInCart(itemCart, getItem);
      const product = await productServices.getProductById(getItem[index].id)
      if (e.target.value == "+") {
        getItem[index].quanlityOrder++;
        if(product.quanlity < getItem[index].quanlityOrder){
          getItem[index].quanlityOrder--
          alert("sản phẩm không đủ số lượng")
        }
        this.$cookies.set('cart', JSON.stringify(getItem))
      } 
      else {
        getItem[index].quanlityOrder--;
        if(getItem[index].quanlityOrder <=0){
          getItem[index].quanlityOrder++;
          alert("Số lượng phải lớn hơn 0")
        }
        this.$cookies.set('cart', JSON.stringify(getItem))
      }
      this.$emit('changeQuanlity')
    },
    deleteCartItem(itemCart) {
      const getItem =  this.$cookies.get("cart");
      const itemDeleted = getItem.filter(function (item) {
        return item.id !== itemCart._id;
      });
      console.log(itemDeleted);
      this.$cookies.set('cart', itemDeleted)
      this.$emit('deleteitemCart')
    },
    isProductInCart(newItem, Arrayproduct) {
      var index = -1;
      for (var i = 0; i < Arrayproduct.length; i++) {
        if (Arrayproduct[i].id == newItem._id) {
          index = i;
        }
      }
      return index;
    },
  },
};
</script>

<style>
@import "../../assets/css/cart.css";
</style>
