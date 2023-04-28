<template>
    <router-view name="page-header"></router-view>
    <!-- <header-com></header-com> -->
    <router-view />
    <!-- <footer-com></footer-com> -->
    <router-view name="page-footer"></router-view>

</template>

<script>
// props send data from parentComponent to childComponent, child recieve data with keyword props{}
// envet up passing data from chidCom to parentCom, parent update data
// import FooterCom from './components/layout/Footer.vue';
// import HeaderCom from './components/layout/header.vue'
export default {
  name: "App",
  components:{
    // FooterCom,
    // HeaderCom
  }
};
</script>

<style>
</style>
