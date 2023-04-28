<template>
  <form method="POST" action="/order" class="row cart__bottom" id="infoUSer">
    <div class="col-lg-6">
      <div class="cart__infomation">

        <h3 class="cart__note my-2">Thông tin nhận hàng</h3>
        <input
          type="text"
          class="cart__phone"
          placeholder="Họ và tên"
          name="nameCustomer"
          v-model="infoUser.nameCustomer"
        />
        <input
          type="text"
          class="cart__phone"
          placeholder="Số điện thoại"
          name="phone"
          v-model="infoUser.phone"
        />
        <div class="option__ship">
          <select class="form-select mb-2" @change="changeOption" name="1" id="">
            <option value="1">Tại cửa hàng</option>
            <option value="2">Giao hàng tận nhà</option>
          </select>
        </div>
        <textarea
        v-if="activeAddress"
          v-model="infoUser.address"
          name="address"
          id=""
          rows="4"
          class="cart__address"
          placeholder="Địa chỉ nhận hàng ( cụ thể số nhà tên đường)"
        ></textarea>
        <div v-else>
          <span class="text-danger">Địa chỉ cửa hàng: 3/2 Hưng lợi, Ninh Kiều, Cần thơ</span>
        </div>
      </div>
      </div>
    <div class="col-lg-6">
      <div class="cart__infomation">
        <h3 class="infomation__headding my-2">Thông tin đơn hàng</h3>
        <div class="row mb-2">
          <div class="col-auto">
            <input
              type="text"
              class="form-control"
              placeholder="Mã giảm giá"
            />
          </div>
          <div class="btn col-auto btn-info">Áp dụng</div>
        </div>
        <p class="info__total-price">
          Giảm:
          <span id="price">{{ formatCurrency(0 * 0.003) }}</span>
        </p>
        <p class="info__total-price"  v-if="activeAddress">
          Phí vận chuyển:
          <span id="price">{{ formatCurrency(totalProduct * 0.003) }}</span>
        </p>
        <p class="info__total-price">
          Tổng tiền: <span id="price" v-if="activeAddress">{{ formatCurrency(totalProduct + totalProduct * 0.003) }}</span>
          <span id="price" v-else>{{ formatCurrency(totalProduct) }}</span>
        </p>
        <a class="btn__pay mb-2" @click.prevent.stop="order">Tiến hành thanh toán</a>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      infoUser: [],
      activeAddress:false
    };
  },
  props: {
    totalProduct: { type: Number },
  },
  emits: ["orderProduct"],
  methods: {
    formatCurrency(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    async order() {
       this.$emit("orderProduct", this.infoUser);
      this.infoUser=[]

    },
    changeOption(e){
      const isSelected=e.target.options.selectedIndex
      if(isSelected !=0){
        this.activeAddress=true
      }else{
        this.activeAddress=false
      }
    }
  },
};
</script>

<style></style>
