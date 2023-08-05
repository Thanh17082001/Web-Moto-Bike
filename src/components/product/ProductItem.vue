<template>
  <div class="col-lg-3 item mt-3">
    <div class="product__card">
      <div class="prouct__top">
        <router-link :to="{ name: 'product.detail', params: { id: productItem._id } }"
          class="info__btn product__detail">Xem chi tiết</router-link>
        <img :src="productItem.imgUrl" alt="" class="product__img" />
      </div>
      <div class="product__info">
        <span class="info__name">{{ productItem.name }}</span>
        <div class="info__color text-center fs-3">
          <span v-if="productItem.color" class="color__deatail text-black me-3">Màu sắc: {{ productItem.color }}</span>
          <span v-if="!productItem.color" class="color__deatail text-black me-3">Sản phẩm không có màu</span>
        </div>
        <span class="info__price">
          {{ formatCurrency(productItem.price) }}</span>
        <button class="info__btn" @click.prevent.stop="addProductToCart(productItem)">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import cartSevice from '../../services/cart.service'
import productServices from "../../services/product.services";
export default {
  name: "productItem-com",
  data() {
    return {
      colors: {},
    };
  },
  props: {
    productItem: {},
  },
  methods: {
    // addProductToCart(productItem) {
    //   if(confirm('Bạn muốn thêm sản phẩm này vào giỏ hàng')){
    //     var cartList=[]
    //     const cartProduct= {...productItem,quanlityOrder:1}
    //     if(!sessionStorage.getItem('cart')){
    //       cartList.push(cartProduct)
    //       sessionStorage.setItem('cart', JSON.stringify(cartList))
    //     }else{
    //       var getItem=JSON.parse(sessionStorage.getItem('cart'))
    //       var isCartItem= this.isProductInCart(productItem, getItem)
    //       if(isCartItem == -1){
    //         getItem.push(cartProduct)
    //         sessionStorage.setItem('cart', JSON.stringify(getItem))
    //       }else{
    //         getItem[isCartItem].quanlityOrder++
    //         sessionStorage.setItem('cart', JSON.stringify(getItem))
    //       }
    //     }
    //   }
    // },

    async addProductToCart(productItem) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      
      if (!user) {
        if (confirm(`Bạn muốn thêm ${productItem.name} vào giỏ hàng`)) {
          let cartList = [];
          const cartProduct = { id: productItem._id, quanlityOrder: 1 };
          if (!this.$cookies.isKey("cart")) {
            cartList.push(cartProduct);
            this.$cookies.set("cart", JSON.stringify(cartList));
          } else {
            let getItemToCookie = this.$cookies.get("cart");
            const isCartItem = this.isProductInCart(
              productItem,
              getItemToCookie
            );
            if (isCartItem == -1) {
              getItemToCookie.push(cartProduct);
              this.$cookies.set("cart", JSON.stringify(getItemToCookie));
            } else {
              const product = await productServices.getProductById(productItem._id)
              getItemToCookie[isCartItem].quanlityOrder++;
              if(getItemToCookie[isCartItem].quanlityOrder > product.quanlity){
                getItemToCookie[isCartItem].quanlityOrder=product.quanlity
              }
              this.$cookies.set("cart", JSON.stringify(getItemToCookie));
            }
          }
        }
      } else {
        if(confirm(`Bạn muốn thêm ${productItem.name} vào giỏ hàng`)){
          const product = await productServices.getProductById(productItem._id)
          const data ={
            productId:productItem._id,
            userId:user._id
          }
          const productsFromCarrt = await cartSevice.addProductToCart(data)
          const products= productsFromCarrt.products
          for(let i=0; i<products.length;i++){
            if(products[i].quanlityOrder > product.quanlity && products[i].idProduct == product._id){
               await cartSevice.updateQuanlity({idProduct: productItem._id, idUser: user._id, quanlityOrder:product.quanlity})
               alert('Số sản phẩm đã hết')
            }
          }
        }
      }
    },
    formatCurrency(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
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

<style></style>
