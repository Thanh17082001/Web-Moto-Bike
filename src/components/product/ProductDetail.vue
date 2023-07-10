<template>
  <div class="product-detail container my-5">
    <h3 class="product__title text-uppercase text-center my-5">
      Chi tiết sản phẩm
    </h3>
    <div  class="row ">
      <div class="col-lg-4 h-100">
        <img
          :src="products.imgUrl"
          alt=""
          class="detail__img p-3"
        />
      </div>
      <div class="col-lg-8">
        <div class="product__infomation">
          <h3 class="product__infomation-name">{{ products.name }}</h3>
          <p class="product__infomation-price">
            Giá: <span id="product__price">{{ formatCurrency(products.price) }}</span>
          </p>
          <p class="product__infomation-size" v-if="products.color">
            Màu sắc: <span>{{ products.color }}</span>
          </p>
          <p class="product__infomation-size">
            Mô tả: <span>{{ products.description }}</span>
          </p>
          <div class="product__actions">
            <a href="" class="actions__btn" @click.prevent.stop="addProductToCart(productItem)">Thêm vào giỏ hàng</a>
          </div>
        </div>
      </div>
    </div>
    <!-- cung loai -->
    <h3 class="content__title text-center mt-3 "><span class="text-black">Sản phẩm cùng loại </span></h3>
    <div class="row sildeshow-product">
      <product-item v-for="(product, index) in productsSimilar"
        :key="index" :productItem="product"></product-item>
    </div>

    <!-- comment -->
    <product-comment :idProduct="$route.params.id"></product-comment>

  </div>
</template>

<script>
import productServices from "../../services/product.services";
import productItem from "./ProductItem.vue"
import productComment from "./ProductComment.vue"
export default {
  props: {
    id: { String },
  },
  components:{
    productItem,
    productComment
  },
  data() {
    return {
      products: {},
      productsSimilar: {},
    };
  },
  watch:{
    'id'(){
      this.getProductById()
    }
  },
  methods: {
    async getProductById() {
      this.products = await productServices.getProductById(this.id);
      this.getProductByCategory(this.products.idCategory);
      console.log(this.products)
    },
    async getProductByCategory(id) {
      this.productsSimilar = await productServices.getProductByCategory(id);

    },
    formatCurrency(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    addProductToCart(productItem) {
      if(confirm('Bạn muốn thêm sản phẩm này vào giỏ hàng')){
        var cartList=[]
        const cartProduct= {...productItem,quanlityOrder:1}
        if(!sessionStorage.getItem('cart')){
          cartList.push(cartProduct)
          sessionStorage.setItem('cart', JSON.stringify(cartList))
          console.log('chưa có')
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
        alert('Đã thêm vào giỏ hàng')
      }
    },
  },
  mounted() {
    this.getProductById();
  },
};
</script>

<style></style>
