<template>
  <div v-for="item in news" :key="item._id" class="col-lg-4 mb-3">
        <a href="news/{{item._id}}" class="news">
          <div class="news__contain-img">
            <img :src="item.imgUrl" alt="" class="news__img" />
          </div>
          <h3 class="news__title">{{ item.name }}</h3>
          <p class="news__description">
            {{ item.description }}
          </p>
        </a>
    </div>
</template>

<script>
export default {
    props:{
        news:{}
    }
}
</script>

<style>

</style>