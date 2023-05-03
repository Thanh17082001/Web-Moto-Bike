<template>
  <div class="container">
    <h2 class=" text-center my-5 text-uppercase">Tin tức</h2>
    <div class="row">
      <NewsItem :news="news"></NewsItem>
    </div>
  </div>
</template>

<script>
import newsService from '../services/news.service';
import NewsItem from '../components/news/NewsItem.vue';
export default {
  name: "news-com",
  components:{
    NewsItem
  },
  data() {
    return {
      news:{}
    };
  },
  methods:{
    async getNews(){
      this.news = await newsService.fetchNews()
    }
  },
  created(){
    this.getNews()
  }
};
</script>

<style>
@import '../assets/css/news.css'
</style>