<template>
  <div class="show__detail mt-5">
    <table class="table">
      <thead class="table__title">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tên</th>
          <th scope="col">Số lượng</th>
          <th scope="col">Giá</th>
          <th scope="col">Ngày thêm</th>
          <th scope="col">Ngày cập nhật</th>
          <th scope="col">Khôi phục</th>
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
            <a
              href=""
              class="product__edit"
              @click.prevent.stop="restoreProduct(product._id)"
            >
            <i class="fa-solid fa-trash-can-arrow-up"></i>
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
  name: "admin-trash",
  data() {
    return {
      products: {},
    };
  },
  methods: {
    async getProductsInTrash() {
      try {
        this.products = await productServices.trashProduct();
      } catch (error) {
        console.log(error);
      }
    },

    async restoreProduct(id) {
      if (confirm("Bạn có muốn khôi phục sản phẩm này không?")) {
        try {
          await productServices.restoreProduct(id);
          this.getProductsInTrash();
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
  created() {
    this.getProductsInTrash();
  },
};
</script>

<style></style>
