<template>
  <div class="row sec-right__products">
    <div class="col-lg-4"  v-for="category in categories" :key="category._id">
      <div @click="chageCategory(category._id)" class="sec-right__info-product">
        <!-- <div class="product-info__icon">
          <i class="fa-sharp fa-solid fa-motorcycle icon"></i>
        </div> -->
        <div class="product-info__group" >
          <p class="product-info__name">{{ category.name }}</p>
          <!-- <p class="product-info__quanlity">3000</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import categoryServices from '../../services/category.services';
export default {
  data(){
    return{
      categories:{}
    }
  },
  emits:["change:category"],
  methods:{
    async getCategories(){
      try {
        this.categories= await categoryServices.getCategoryProduct();
      } catch (error) {
        console.log(error)
      }
    },
    chageCategory(id){
      this.$emit("change:category", id);
    }
  },
  created(){
    this.getCategories();
  }
};
</script>
<style>
</style>