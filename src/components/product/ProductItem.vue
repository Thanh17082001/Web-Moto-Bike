<template>
  <div class="col-lg-3 item mt-3">
    <div  class="product__card">
      <div class="prouct__top">
        <router-link :to="{name:'product.detail', params:{id:productItem._id}}" class="info__btn product__detail">Xem chi tiết</router-link>
        <img :src="productItem.imgUrl" alt="" class="product__img" />
      </div>
      <div class="product__info">
        <span class="info__name">{{ productItem.name }}</span>
        <div class="info__color text-center fs-3">
          <span v-if="productItem.color" class="color__deatail text-black  me-3">Màu sắc: {{ productItem.color }}</span>
          <span v-if="!productItem.color" class="color__deatail text-black me-3">Sản phẩm không có màu</span>
        </div>
        <span class="info__price"> {{ formatCurrency(productItem.price) }}</span>
        <button class="info__btn" @click.prevent.stop="addProductToCart(productItem)">Thêm vào giỏ hàng</button>
      </div>
    </div>
  </div>
</template>

<script>
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
    addProductToCart(productItem) {
      if(confirm('Bạn muốn thêm sản phẩm này vào giỏ hàng')){
        var cartList=[]
        const cartProduct= {...productItem,quanlityOrder:1}
        if(!sessionStorage.getItem('cart')){
          cartList.push(cartProduct)
          sessionStorage.setItem('cart', JSON.stringify(cartList))
        }else{
          var getItem=JSON.parse(sessionStorage.getItem('cart'))
          var isCartItem= this.isProductInCart(productItem, getItem)
          if(isCartItem == -1){
            getItem.push(cartProduct)
            sessionStorage.setItem('cart', JSON.stringify(getItem))
          }else{
            getItem[isCartItem].quanlityOrder++
            sessionStorage.setItem('cart', JSON.stringify(getItem))
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
    isProductInCart(newItem,Arrayproduct){
        var index=-1;
        for(var i=0;i<Arrayproduct.length;i++){
            if(Arrayproduct[i]._id==newItem._id){
                index=i;
            }
        }
        return index;
    }
  },
  
};
</script>

<style></style>