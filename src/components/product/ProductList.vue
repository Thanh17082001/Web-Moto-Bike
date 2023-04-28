<template>
  <div class="col-lg-10 product__body">
      <div class="row my-4">
        <product-item v-for="productItem in products" :key="productItem._id" :productItem="productItem"></product-item>
      </div>
  </div>
</template>

<script>
import productItem from './ProductItem.vue'
export default {
  name: "list-user",
  components:{
    productItem
  },
  props: {
    products: {},
  },
  methods:{
    
  }
};
</script>

<style>
@import "../../assets/css/product.css";


</style>
