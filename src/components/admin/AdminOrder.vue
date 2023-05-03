<template>
  <div class="mx-2 color"> 
    <h3 class="heading">Tất cả các đơn hàng</h3>
    <div class="row">
      <ul class="list-group col-lg-3">
        <p class="text-center fs-4">Tên khách hàng</p>
        <li
          v-for="(order,index) in orders"
          :key="order._id"
          class="list-group-item d-flex justify-content-between"
          :class="{active:index == isActive}"
        >
          {{ order.nameCustomer }}
          <i
            class="fa-solid fa-chevron-down p-2"
            @click="showDetaiOrder(order._id, order.status,index,order.createdAt)"
          ></i>
        </li>
      </ul>
      <div class="col-lg-9">
        <p class="text-center  fs-4">Đơn hàng</p>

        <table class="table">
          <thead class="table__title">
            <tr>
              <th scope="col">Trạng thái</th>
              <th scope="col">Ngày đặt hàng</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Giá</th>
            </tr>
          </thead>
          <tbody class="table__body">
            <tr v-for="(item, index) in orderDetails" :key="index">
              <th  scope="row">{{ status }}</th>
              <th  scope="row">{{ formatDate(createdAt) }}</th>
              <td>{{ item.products.name }}</td>
              <td>{{ item.orderdetail.quanlityOrder }}</td>
              <td>{{ formatCurrency(item.products.price) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="total__price">
        Tổng giá: {{ total }}
    </div>
  </div>
</template>

<script>
import orderService from "../../services/order.service";
export default {
  data() {
    return {
      orders: {},
      isActive: -1,
      orderDetails: [],
      total:0,
      status:'',
      createdAt:'',
    };
  },
  methods: {
    async getAllOrder() {
      this.orders = await orderService.getAll();
    },
    async showDetaiOrder(idOrder,status,index, createdAt) {
      this.isActive = index;
      this.status=status
      this.createdAt=createdAt
      const resulf= await orderService.getOrderDetailById(idOrder);
        this.orderDetails=resulf
        this.total=this.sumPrice(resulf)
    },
    sumPrice(products){
      var sum=0
      for(let i=0;i<products.length;i++){
        sum+=products[i].orderdetail.total
      }
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(sum);
    },
    formatCurrency(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("default", { dateStyle: "short" }).format(
        date
      );
    },
  },
  created() {
    this.getAllOrder();
  },
};
</script>

<style>
.color{
    color: #fff ;
}
.total__price{
    color: #fff;
    font-size: 20px;
    padding: 20px;
    min-width: 160px;
    float: right;
    border: 1px solid #fff;
    margin-top: 10px;
}
</style>
