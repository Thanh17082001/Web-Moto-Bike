<template>
    <main class="main row">
        <menu-admin></menu-admin>
        <content-admin></content-admin>
    </main>
</template>

<script>
import MenuAdmin from '../components/admin/AdminMenu.vue'
import ContentAdmin from '../components/admin/AdminContent.vue'
export default {
    components:{
        MenuAdmin,
        ContentAdmin
    },
    
}
</script>

<style lang="css" scoped> 
 @import '../assets/css/admin.css'
</style>