<template>
  <div>
    <h3 class="heading">Thống kê</h3>
    <div class="d-flex justify-content-center align-items-center">
      <span class="fs-5">Chọn ngày</span>
      <input type="date" name="date" class="input__date mx-3" v-model="date" />
    </div>
    <div class="d-flex justify-content-center align-items-center mt-4">
      <button
        class="btn btn-outline-warning text-center px-4"
        @click="statiscalDay({ day: date })"
      >
        Thống kê
      </button>
    </div>

    <div class="d-flex justify-content-center align-items-center mt-4">
      <span class="fs-5 mx-4">Lựa chọn thống kê theo: </span>
      <span>Tuần</span>
      <button class="btn btn-outline-success px-4 mx-3" @click="statiscalWeek">
        1 tuần
      </button>
      <span>Tháng</span>
      <select
        @change="statiscalMonth"
        class="mx-4 btn btn-outline-info"
        aria-label="Default select example"
      >
        <option selected>Tháng</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
    </div>
    <div class="text-center">
      <span class="fs-3 text-danger mt-5 d-block">Chi tiết Thống kê </span>
      <span class="fs-5 my-2 d-block text-warning"
        >Số lượng đơn hàng đã bán: <span>{{ sumOrder }}</span></span
      >
      <span class="fs-5 my-2 d-block text-warning"
        >Số lượng sản phẩm đã bán:
        <span
          >{{ sumProduct }}
          <button class="btn btn-info" @click="isDetail = !isDetail">
            Xem chi tiết
          </button></span
        ></span
      >
      <ul v-if="isDetail">
        <li
          class="fs-5 my-2 d-block text-success"
          v-for="product in products"
          :key="product._id"
        >
          Sản phẩm: <span>{{ product.result2.name }}</span>
          <br>
          Số lượng đặt hàng: <span>{{ product.quanlityOrder }}</span>
        </li>
      </ul>
      <span class="fs-5 my-2 d-block text-warning"
        >Tổng doanh thu: <span>{{ formatCurrency(revenue) }}</span></span
      >
    </div>
  </div>
</template>

<script>
import orderService from "../services/order.service";
import productServices from "../services/product.services";
export default {
  data() {
    return {
      date: Date,
      data:Date,
      sumOrder: 0,
      sumProduct: 0,
      revenue: 0,
      products: [],
      isDetail: false,
    };
  },
  methods: {
    statiscalWeek() {
      this.products=[]
      this.data=''
      this.date = new Date();
      const week = this.date;
      this.data={week}
      this.statiscal();
    },
    statiscalDay(day) {
      this.products=[]
      this.data=''
      this.data=day
      this.statiscal();
    },
    statiscalMonth(e) {
      this.products=[]
      this.data=''
      const isSelected = e.target.options.selectedIndex;
      this.data={ month: isSelected }
      this.statiscal();
    },

    async statiscal() {
      this.products=[]
      const data=this.data
      this.sumOrder = 0;
      this.sumProduct = 0;
      this.revenue = 0;
      if (Object.keys(data).length > 0) {
        const result = await orderService.statiscal(data);
        // var products = [];
        var orders = result.data;
        if (orders.length != 0) {
          this.sumOrder = orders.length;
          for (var i = 0; i < orders.length; i++) {
            var ordersDetail = await orderService.getOrderDetailById(
              orders[i]._id
            );
            for (var j = 0; j < ordersDetail.length; j++) {
              this.revenue += ordersDetail[j].orderdetail.total;
              this.sumProduct += ordersDetail[j].orderdetail.quanlityOrder;
              const result2 = await productServices.getProductById(
                ordersDetail[j].products._id
              );
              this.products.push({result2, quanlityOrder:ordersDetail[j].orderdetail.quanlityOrder});
            }
          }
          console.log(this.products);
        }
      }
    },
    formatCurrency(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
  },
};
</script>

<style>
span {
  color: #fff;
}

.chart {
  color: #fff;
}

.input__date {
  height: 40px;
  padding: 0 10px;
  color: #111;
  border-radius: 6px;
}
</style>
