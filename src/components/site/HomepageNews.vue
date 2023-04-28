<template>
  <h2 class="page__headding">Tin tức</h2>
  <div class="row">
    <!-- <div class="col-lg-6">
      <div class="row">
        <div v-for="(item,index) in decayNews()" :key="index" class="col-lg-12">
          <a  href="#" class="homepage-news__content">
            <div class="hompage-news__btn">Xem thêm</div>
            <img
              :src="item.imgUrl"
              alt=""
              class="w-100 h-75"
            />
            <div class="hompage-news__info">
              <span class="hompage-news__name">
                {{ item .name }}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div> -->
    <div class="col-lg-12">
      <div class="row">
        <div v-for="item in news" :key="item._id" class="col-lg-3">
          <a href="#" class="news__right">
            <div class="hompage-news__btn">Xem thêm</div>
            <img
              :src="item.imgUrl"
              alt=""
              class="w-100 h-75"
            />
            <div class="news-right__info">
              <span class="news-right__name">
                {{ item.name }}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-news",
  props:{
    news:{}
  },
  data(){
    return {
        newsCenter:[],
        newsElement:{}
    }
  },
  methods:{
    async decayNews(){
        this.newsCenter= await this.news.slice(0,1)
        console.log(this.newsCenter)
        return this.newsCenter;
    }
   
  },
  
};
</script>

<style></style>
