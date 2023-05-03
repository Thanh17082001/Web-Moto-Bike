<template>
  <div class="container content__order mt-5 mb-5">
    <div
      v-for="order in orders"
      :key="order._id"
      class="row d-flex justify-content-center"
    >
      <div class="col-md-8" v-if="token">
        <div class="card mb-5">
          <div class="text-left logo p-2 px-5">
            <img src="https://gudlogo.com/wp-content/uploads/2019/04/logo-chu-T-logot.jpg" width="100" />
          </div>
          <div class="invoice p-5">
            <h5 class="text-center">Hóa đơn</h5>
            <span class="font-weight-bold d-block mt-4"
              >Khách hàng:
              <span class="">{{ order.InfoOrder.nameCustomer }}</span></span
            >
            <div
              class="payment border-top mt-3 mb-3 border-bottom table-responsive"
            >
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td>
                      <div class="py-2">
                        <span class="d-block text-muted">Order Date</span>
                        <span class="text-black">{{ formatDate(order.InfoOrder.createdAt) }}</span>
                      </div>
                    </td>
                    <td>
                      <div class="py-2">
                        <span class="d-block text-muted">Order No</span>
                        <span class="text-black">{{ order.InfoOrder._id }}</span>
                      </div>
                    </td>
                    <td>
                      <div class="py-2">
                        <span class="d-block text-muted">Address</span>
                        <span class="text-black" v-if="order.InfoOrder.address !=''">{{order.InfoOrder.address }}</span>
                        <span v-else>Nhận xe tại cửa hàng</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="product border-bottom table-responsive mb-4">
                <productOrder :orderProduct="order"></productOrder>
            </div>
            <div class="summ__price">
             <div class="sum__content">Tổng cộng: {{ sumPrice(order.products) }}</div> 
            </div>
            <p class="mt-4">
              Chúng tôi sẽ gửi email xác nhận vận chuyển khi mặt hàng được vận chuyển thành công!
            </p>
            <p class="font-weight-bold mb-0">Thanks for shopping with us!</p>
            <span>TT cake</span>
          </div>
        </div>
        
      </div>
    </div>
    <div v-if="token== false" class="text-center fs-3">
      <span class="text-black">Đăng nhập để xem <router-link to="/login">Đăng nhập tại đây</router-link></span>
    </div>
    
  </div>
</template>

<script>
import orderService from "../services/order.service";
import productOrder from '../components/order/ProductOrder.vue'
export default {
    components:{
        productOrder
    },
  data() {
    return {
      orders: [],
      token: false,
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("default", { dateStyle: "short" }).format(
        date
      );
    },
    async getOrder() {
      if (sessionStorage.getItem("user")!=null) {
        this.token = true;
        const idUser = JSON.parse(sessionStorage.getItem("user"));
        const resulf = await orderService.historyOrder(idUser._id);
        this.orders = [...resulf.data];
        console.log(this.orders)
      }else{
        this.token=false
      }
    },
    sumPrice(products){
      var sum=0
      for(let i=0;i<products.length;i++){
        sum+=products[i].total
      }
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(sum);
    }
    
  },
  created() {
    this.getOrder();
  },
};
</script>

<style>
.summ__price{
  display: flex;
  justify-content: flex-end;
  
}
.sum__content{
  padding: 20px;
  border: 1px solid #6C9BCF;
  width: 280px;
  border-radius: 5px;
}
.content__order{
  min-height: 100vh;
}
</style>
