<template>
  <div class="sec__right-product">
    <h3 class="heading">Sản phẩm của cửa hàng</h3>
    <admmin-nav-poduct @change:category="changeCategory"></admmin-nav-poduct>
    <h3 class="heading">Sản phẩm còn lại</h3>
    <admin-table-product :products="products" @delete:product="deleteProduct"></admin-table-product>
    <h3 class="heading">Sản phẩm hết hàng</h3>
    <admin-table-product :products="productsOut" @delete:product="deleteProduct"></admin-table-product>
  </div>
</template>

<script>
import AdminTableProduct from "./AdminTableProduct.vue";
import AdmminNavPoduct from "./AdminNavigationProduct.vue";
import productServices from "../../services/product.services";
export default {
  components: {
    AdminTableProduct,
    AdmminNavPoduct,
  },
  data() {
    return {
      products: {},
      productsOut:{}
    };
  },
  methods: {
    async getProducts() {
      try {
        this.products = await productServices.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    async getProductsEqualToZero() {
      try {
        this.productsOut = await productServices.getProductEqualToZero();
      } catch (error) {
        console.log(error);
      }
    },
    deleteProduct(){
      this.getProducts()
    },
    async changeCategory(id){
        this.products = await productServices.getProductByCategory(id);
    }
  },
  created() {
    this.getProducts();
    this.getProductsEqualToZero()
  },
};
</script>

<style></style>
