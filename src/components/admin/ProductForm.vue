<template>
  <div class="container d-flex justify-content-center align-items-center py-5">
    <Form
      @submit="addProduct"
      class="form__add"
      :validation-schema="productFormSchema"
    >
      <h3 class="add__headding">Thêm sản phẩm</h3>
      <div class="add__group">
        <div class="mt-3">
          <label for="" class="form-label">Sản phẩm</label>
          <div class="d-flex typeProduct">
            <div
              class="me-3 form-check"
              v-for="(category,index) in categories"
              :key="category._id"
            >
              <input
                name="idCategory"
                :value="category._id"
                type="radio"
                class="form-check-Field me-2"
                :id="category._id+index"
                v-model="ProductLocal.idCategory"
                @change="toggle"
              />
              <label class="form-check-label" :for="category._id">{{
                category.name
              }}</label>
            </div>
          </div>
        </div>

        <div class="mt-3" v-if="active == 1"> 
          <label for="" class="form-label">Loại</label>
          <div class="d-flex type">
            <div class="d-flex typeProduct">
            <div
              class="me-3 form-check"
              v-for="value in types"
              :key="value._id"
            >
              <input
                name="idType"
                :value="value._id"
                type="radio"
                class="form-check-Field me-2"
                :id="value._id"
                v-model="ProductLocal.idType"
              />
              <label class="form-check-label" :for="value._id">{{
                value.name
              }}</label>
            </div>
          </div>
          </div>
        </div>
        <div class="mt-3" v-if="active == 1"> 
          <label for="" class="form-label">Hãng</label>
          <div class="d-flex type">
            <div class="d-flex typeProduct">
            <div
              class="me-3 form-check"
              v-for="company in companies"
              :key="company._id"
            >
              <input
                name="idCompany"
                :value="company._id"
                type="radio"
                class="form-check-Field me-2"
                :id="company._id"
                v-model="ProductLocal.idCompany"
              />
              <label class="form-check-label" :for="company._id">{{
                company.name
              }}</label>
            </div>
          </div>
          </div>
        </div>
        <div class="mt-3">
          <label class="form-label">Tên sản phẩm</label>
          <br />
          <Field
            name="name"
            type="text"
            class="form-control"
            placeholder="Nhập tên sản phẩm"
            v-model="ProductLocal.name"
          />
          <ErrorMessage name="name" class="text-danger" />
        </div>
        <div class="mt-3">
          <label class="form-label">Hình sản phẩm</label>
          <br />
          <Field
            name="imgUrl"
            type="text"
            class="form-control"
            placeholder="Nhập link hình ảnh"
            v-model="ProductLocal.imgUrl"
          />
          <ErrorMessage name="imgUrl" class="text-danger" />
        </div>
        <div class="mt-3">
          <label class="form-label">Giá sản phẩm</label>
          <br />
          <Field
            name="price"
            type="number"
            class="form-control"
            placeholder="Nhập giá sản phẩm"
            v-model="ProductLocal.price"
          />
          <ErrorMessage name="price" class="text-danger" />
        </div>
        <div class="mt-3">
          <label class="form-label">Số lượng sản phẩm</label>
          <br />
          <Field
            name="quanlity"
            type="number"
            class="form-control"
            placeholder="Nhập số lượng sản phẩm"
            v-model="ProductLocal.quanlity"
          />
          <ErrorMessage name="quanlity" class="text-danger" />
        </div>
        <div class="mt-3" v-if="active == 1">
          <label class="form-label">Tên màu sản phẩm</label>
          <br />
          <Field
            name="color"
            type="text"
            class="form-control"
            placeholder="Nhập tên màu sản phẩm"
            v-model="ProductLocal.color"
          />
          <ErrorMessage name="color" class="text-danger" />
        </div>
        <div class="mt-3">
          <label class="form-label" >Mô tả</label>
          <br />
          <Field
            name="description"
            type="text"
            class="form-control"
            placeholder="Mô tả về sản phẩm"
            v-model="ProductLocal.description"
          />
          <ErrorMessage name="description" class="text-danger" />
        </div>
      </div>
      <p class="text-success text center fs-5">{{ message }}</p>
      <button type="submit" class="add__btn">Thêm</button>
    </Form>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import categorysService from "../../services/category.services";
import typeService from "../../services/type.services";
import companyService from "../../services/company.services";
import productService from "../../services/product.services";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const productFormSchema = yup.object().shape({
      //   name: yup
      //     .string()
      //     .required("Tên phải có giá trị.")
      //     .min(2, "Tên phải ít nhất 2 ký tự.")
      //     .max(50, "Tên có nhiều nhất 50 ký tự."),
      //   imgUrl: yup
      //     .string()
      //     .required("Phải có giá trị.")
      //     .min(2, "Phải ít nhất 2 ký tự."),
      //   colorName: yup
      //     .string()
      //     .required("Phải có giá trị.")
      //     .min(2, "Phải ít nhất 2 ký tự."),
      //   colorCode: yup
      //     .string()
      //     .required("Phải có giá trị.")
      //     .min(2, "Phải ít nhất 2 ký tự."),
    });
    return {
      productFormSchema,
      ProductLocal: {},
      categories: {},
      types: {},
      companies:{},
      active:-1,
      message:''
    };
  },
  methods: {
    async addProduct() {
      // const data = { idCategory: this.ProductLocal[0], idType:this.ProductLocal[1], idCompany:this.ProductLocal[2], ...this.ProductLocal};
      console.log(this.ProductLocal)
      try {
        await productService.addProduct(this.ProductLocal)
        this.ProductLocal={}
        this.active=-1
        this.message='Thêm sản phẩm thành công'
      } catch (error) {
        console.log(error)
      }
    },
    async getCategoryProduct() {
      this.categories = await categorysService.getCategoryProduct();
    },
    async getTypeProduct() {
      this.types = await typeService.getTypeProduct();
    },
    async getCompanyProduct() {
      this.companies = await companyService.getCompanyProduct();
    },
    toggle(e){
      if(e.target.checked && e.target.value == '640986149dbfbaaf137fdb41'){
        this.active=1
      }
      else{
        this.active=-1
      }
    }
  },
  created() {
    this.getCategoryProduct();
    this.getTypeProduct();
    this.getCompanyProduct();
  },
};
</script>

<style>
@import "../../assets/css/add.css";
</style>
