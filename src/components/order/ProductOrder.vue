<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Tên sản phẩm</th>
        <th scope="col">Số lượng</th>
        <th scope="col">Giá 1 SP</th>
        <th scope="col">Giá Tổng</th>
      </tr>
    </thead>
    <tbody v-for="product in products" :key="product._id">
      <tr>
        <td>{{ product.name }}</td>
        <td>{{ product.quanlityOrder }}</td>
        <td class="price">{{ formatCurrency(product.price) }}</td>
        <td class="price text-black">{{ formatCurrency(product.total) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import productServices from "../../services/product.services";

export default {
  props: {
    orderProduct: { Object },
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async getProduct() {
      const idProducts = this.orderProduct.products;
      for (let i = 0; i < idProducts.length; i++) {
        const resulf = await productServices.getProductById(
          idProducts[i].idProduct
        );
        const data = {
          ...resulf,
          quanlityOrder: idProducts[i].quanlityOrder,
          total: idProducts[i].total,
        };
        this.products.push(data);
      }
    },
    formatCurrency(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style></style>
