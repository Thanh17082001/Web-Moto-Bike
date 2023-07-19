<template>
  <div class="container mb-4">
    <h3 class="cart__title text-center my-3 text-uppercase">Giỏ hàng</h3>
    <cart-product :listCart="listCart" @changeQuanlity="changeQuanlity" @deleteitemCart="deleteitemCart"></cart-product>
    <cart-info-user :totalProduct="totalProduct" @order-product="orderProduct"></cart-info-user>
  </div>
</template>

<script>
import cartProduct from "../components/cart/CartProduct.vue";
import cartInfoUser from "../components/cart/CartInfoUser.vue";
import orderService from '../services/order.service'
import productServices from "../services/product.services";
export default {
  components: {
    cartProduct,
    cartInfoUser,
  },
  data(){
    return{
      listCart: [],
      totalProduct:0
    }
  },
  methods:{
    async getItemFromSecsion() {
      if (this.$cookies.isKey("cart")) {
        const products = this.$cookies.get("cart");
        for(let i=0 ; i<products.length;i++){
          const product = await productServices.getProductById(products[i].id)
          this.listCart.push({
            ...product,
            quanlityOrder:products[i].quanlityOrder
          })
        }
      }else{
        this.listCart=[]
      }
    },
    changeQuanlity(){
      this.listCart=[]
      this.getItemFromSecsion()
      this.totalPrice()
    },
    deleteitemCart(){
      this.listCart=[]
      this.getItemFromSecsion()
      this.totalPrice()
    },
    totalPrice(){
      const getItem = JSON.parse(sessionStorage.getItem("cart"));
      var sum=0
      if(getItem){
        for(let i=0;i<getItem.length;i++){
          sum+=getItem[i].price*getItem[i].quanlityOrder
        }
      }
      this.totalProduct=sum;
    },
    async orderProduct(infoUser){
      if(sessionStorage.getItem("cart")){
        if(!sessionStorage.getItem("user")){
          alert('Đăng nhập tài khoản trước khi thanh toán')
        }else {
          if(Object.keys(infoUser).length == 0){
            alert('Điền thông tin')
          }else{
            if(Object.values(infoUser)[0] == ''){
              alert('Bạn hãy nhập tên')
            }else if(Object.values(infoUser)[1] == ''){
              alert('Bạn hãy nhập số điện thoại')
            }
            else if(Object.values(infoUser)[2] == ''){
              alert('Bạn hãy nhập địa chỉ')
            }else{
              const productCart=JSON.parse(sessionStorage.getItem("cart"))
              const idUser=JSON.parse(sessionStorage.getItem("user"))
              const data={idUser,...infoUser,productCart}// xử lý lưu vào database
             const result = await orderService.order(data)
             if(result.status == 200)
             sessionStorage.removeItem('cart')
             this.getItemFromSecsion()
             this.totalProduct=0
             this.$forceUpdate()
             alert('đặt hàng thành công')
            }
          }
        }
      }else{
        alert('chưa có sản phẩm trong giỏ hàng')
      }
    }
  },
  created(){
    this.getItemFromSecsion()
    this.totalPrice()
  }
};
</script>

<style></style>
