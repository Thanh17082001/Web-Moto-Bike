<template>
  <div class="container ">
    <h3 class="my-3 fs-3 text-center">Đánh giá sản phẩm</h3>
  
    <div class=" row">
      <div class=" col-lg-5 ">
        <div class=" comment__post d-flex flex-column">
          <h4 class="text-center mb-3 fs-4 comment__headding">Viết bình luận</h4>
          <div class="d-flex">
            <input type="text" name="content" v-model="comment.content" class="comment__input" placeholder="Viết đánh giá tại đây">
            <button class="comment__btn" @click="postCommnt">Đăng</button>
          </div>
        </div>
      </div>
      <div class=" col-lg-7">
        <div class="comment__post"> 
          <h4 class="text-center mb-3 fs-4 comment__headding">Những đánh giá về sản phẩm</h4>
          <div class="comment__content" v-for="(item, index) in listCommets" :key="index">
            <span class="comment__index"> Bình luận thứ :{{ index+1 }}</span>
            <div class="user__comment">Tên khách hàng: <span>{{ item.username }}</span></div>
            <div class="user__comment">
              Đánh giá:<span> {{ item.content }}</span>
            </div>
            <span class="comment__seperate"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import commentService from '../../services/comment.service'
export default {
  data(){
    return {
      comment:[],
      listCommets:{}
    }
  },
  watch:{
    'idProduct'(){
      this.getComment()
    }
  },
  props:{
    idProduct:{type:String}
  },
  methods:{
    async getComment(){
      this.listCommets = await commentService.getComment(this.idProduct)
    },
    async postCommnt(){
      const user=JSON.parse(sessionStorage.getItem('user'))
      if(user){
        if(this.comment.content){
          const data={idUser:user._id,username:user.name,idProduct:this.idProduct,content:this.comment.content}
          await commentService.postComment(data)
          this.getComment()
          this.comment=[]
        }
      }else{
        alert('Đăng nhập trước khi bình luận')
      }
    }
  },
  created(){
    this.getComment()
  }
};
</script>

<style scoped>
@import '../../assets/css/product.css'
</style>
