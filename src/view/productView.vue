<template>
  <div class="p-2">
    <h2 class="page__headding text-center">Sản phẩm của cửa hàng</h2>
    <div class="product my-5 row">
      <ProductCategory
        @select:category="getProductByCategory"
        @select:all="getAllProduct"
        @select:company="getProductByCompany"
        @select:type="getProductByType"
      ></ProductCategory>
      <ProductList :products="products" />
    </div>
  </div>
</template>

<script>
import ProductList from "../components//product/ProductList.vue";
import ProductCategory from "../components/product/ProductCategory.vue";
import productServices from "../services/product.services";
export default {
  components: {
    ProductList,
    ProductCategory,
  },
  data() {
    return {
      products: {},
    };
  },
  methods: {
    async getAllProduct() {
      this.products = await productServices.getAll();
    },
    async getProductByCategory(id) {
      this.products = await productServices.getProductByCategory(id);
    },
    async getProductByCompany(id) {
      this.products = await productServices.getProductCompany(id);
    },
    async getProductByType(id) {
      this.products = await productServices.getProductType(id);
    },
  },
  created() {
    this.getAllProduct();
  },
};
</script>

<style scoped>
@import "../assets/css/product.css";
</style>
