<template>
  <main class="main container my-5">
    <div class="homepage__product">
      <h2 class="page__headding">Sản phẩm của cửa hàng</h2>
      <span @click="previous" class="btn__product btn__left"
        ><i class="fa-solid fa-chevron-left"></i
      ></span>
      <span class="btn__product btn__right"
        ><i class="fa-solid fa-chevron-right"></i
      ></span>
      <div class="row sildeshow-product">
        

          <product-item v-for="(productItem, index) in products" :key="index" :productItem="productItem"></product-item>
      </div>
    </div>

    <div class="homepage__introduce">
      <homepage-introduce></homepage-introduce>
    </div>

    <div class="homepage__news">
      <homepage-news :news="news"></homepage-news>
    </div>
  </main>
</template>

<script>
import productItem from "../components/product/ProductItem.vue";
import HomepageNews from "../components/site/HomepageNews.vue";
import HomepageIntroduce from "../components/site/HomepageIntroduce.vue";
import newsService from '../services/news.service';
import productService from '../services/product.services';
export default {
  name: "home-com",
  components: {
    productItem,
    HomepageNews,
    HomepageIntroduce,
   
  },
  data() {
    return {
      news: {},
      products: {},
    };
  },
  methods: {
    async getNews() {
      this.news = await newsService.fetchNews();
    },
    async getAllProduct() {
      this.products = await productService.getAll();
    },
    previous(){
      console.log(this.products[0])
    }
  },
  created() {
    this.getNews();
    this.getAllProduct();
  },
};
</script>

<style scoped>
@import "../assets/css/homepage.css";
</style>
