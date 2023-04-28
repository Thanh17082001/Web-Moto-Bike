<template>
  <div class="container">
    <h2
      v-if="Object.keys(products).length >= 0"
      class="page__headding text-center"
    >
      Tìm kiếm sản phẩm với từ khóa:
      <span class="text-danger fs-3">{{ this.searchString }}</span>
    </h2>
    <h2
      v-if="Object.keys(products).length < 0"
      class="page__headding text-center"
    >
      Không tìm thấy kết quả với từ khóa:
      <span class="text-danger fs-3">{{ this.searchString }}</span>
    </h2>
    <div class="row">
      <product-item
        v-for="productItem in products"
        :key="productItem._id"
        :productItem="productItem"
      ></product-item>
      <span class="mb-4"></span>
    </div>
  </div>
</template>

<script>
import productServices from "../services/product.services";
import productItem from "../components/product/ProductItem.vue";
export default {
  components: {
    productItem,
  },
  data() {
    return {
      products: {},
    };
  },
  props: {
    searchString: String,
  },
  watch: {
    searchString() {
      this.searchProduct();
    },
  },
  methods: {
    async searchProduct() {
      this.products = await productServices.search(this.searchString);
      console.log(this.products);
    },
  },
  created(){
      this.searchProduct()
  }
};
</script>

<style></style>
