<template>
  <div class="col-lg-2">
    <div class="product__category ms-1 mt-4">
      <div class="category__name">Danh mục</div>
      <ul class="category__list">
        <li  class="category__item">
          <span @click="selectAllProduct()" href="" class="category__link">Tất Cả</span>
        </li>

        <li v-for="(category,index) in categories" :key="index" class="category__item">
          <span @click="selectProductByCategory(category._id)" href="" class="category__link">{{ category.name }}</span>
        </li>

        <li v-for="(company,index) in companies" :key="index" class="category__item">
          <span @click="selectProductByCompany(company._id)" href="" class="category__link">{{ company.name }}</span>
        </li>

        <li v-for="(type,index) in types" :key="index" class="category__item">
          <span @click="selectProductByType(type._id)" href="" class="category__link">{{ type.name }}</span>
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script>
import categoryServices from '../../services/category.services';
import companyServices from '../../services/company.services';
import TypeServices from '../../services/type.services';
export default {
  data() {
    return {
      categories: [],
      companies: [],
      types: [],
    };
  },
  emits:["select:category","select:company", "select:all", "select:type"],
  methods: {
    async getCategories() {
      try {
        this.categories = await categoryServices.getCategoryProduct();
      } catch (error) {
        console.log(error);
      }
    },
    async getCompany() {
      try {
        this.companies = await companyServices.getCompanyProduct();
      } catch (error) {
        console.log(error);
      }
    },
    async getType() {
      try {
        this.types= await TypeServices.getTypeProduct();
      } catch (error) {
        console.log(error);
      }
    },
     selectProductByCategory(id){
         this.$emit("select:category",id)
    },
     selectProductByCompany(id){
         this.$emit("select:company",id)
    },
    selectProductByType(id){
         this.$emit("select:type",id)
    },
     selectAllProduct(){
         this.$emit("select:all",)
    }
  },
  created(){
    this.getCategories();
    this.getCompany();
    this.getType();
  }
};
</script>

<style></style>
