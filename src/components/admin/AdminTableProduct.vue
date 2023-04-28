<template>
  <div class="show__detail">
    <table class="table">
      <thead class="table__title">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tên</th>
          <th scope="col">Số lượng</th>
          <th scope="col">Giá</th>
          <th scope="col">Ngày thêm</th>
          <th scope="col">Ngày cập nhật</th>
          <th scope="col">sửa</th>
          <th scope="col">xóa</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr v-for="(product, index) in products" :key="product._id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ product.name }}</td>
          <td>{{ product.quanlity }}</td>
          <td>{{ formatCurrency(product.price) }}</td>
          <td>{{ formatDate(product.createdAt) }}</td>
          <td>{{ formatDate(product.updatedAt) }}</td>
          <td>
            <router-link :to="{name:'product.edit', params:{id:product._id}}" class="product__edit">
              <i class="fa-sharp fa-solid fa-pen-to-square"></i>
            </router-link>
          </td>
          <td>
            <a
              href=""
              class="product__remove"
              @click.prevent.stop="deleteProduct(product._id)"
            >
              <i class="fa-solid fa-trash"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import productServices from "../../services/product.services";
export default {
  name: "admin-table",
  props:{
    products:{}
  },
  data(){
    return{
      productList:{}
    }
  },
  emits:['delete:product'],
  methods: {
    getProduct(){
      this.productList={...this.products}
    },
    async deleteProduct(id) {
      if (confirm("Bạn có muốn xóa sản phẩm này ko")) {
        try {
          await productServices.deleteProduct(id);
          this.$emit('delete:product')
        } catch (error) {
          console.log(error);
        }
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("default", { dateStyle: "short" }).format(
        date
      );
    },
    formatCurrency(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
  },
  created(){
    this.getProduct()
  }
  
};
</script>

<style></style>
