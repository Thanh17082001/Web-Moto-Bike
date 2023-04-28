<template>
  <div class="container d-flex justify-content-center align-items-center py-5">
    <Form
      @submit="editProduct()"
      class="form__add"
      :validation-schema="productFormSchema"
    >
      <h3 class="add__headding">Sửa sản phẩm</h3>
      <div class="add__group">
        <div class="mt-3">
          <!-- <label for="" class="form-label">Sản phẩm</label>
          <div class="d-flex typeProduct">
          
          </div> -->
        </div>
        <div  class="mt-3">
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
        <div  class="mt-3">
          <label class="form-label">Màu sắc</label>
          <br />
          <Field
            name="color"
            type="text"
            class="form-control"
            placeholder="Màu sắc"
            v-model="ProductLocal.color"
          />
          <ErrorMessage name="name" class="text-danger" />
        </div>
        <div class="mt-3">
          <label class="form-label">Mô ta</label>
          <br />
          <textarea
            name="description"
            type="text"
            class="form-control"
            placeholder="Mô tả sản phẩm"
            v-model="ProductLocal.description"
          >
          </textarea>
        </div>
      </div>
      <p class="text-success text-center fs-4">{{ message }}</p>
      <button type="submit" class="add__btn">Sửa</button>
    </Form>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import productService from "../../services/product.services";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const productFormSchema = yup.object().shape({
        // name: yup
        //   .string()
        //   .required("Tên phải có giá trị.")
        //   .min(2, "Tên phải ít nhất 2 ký tự.")
        //   .max(50, "Tên có nhiều nhất 50 ký tự."),
        // imgUrl: yup
        //   .string()
        //   .required("Phải có giá trị.")
        //   .min(2, "Phải ít nhất 2 ký tự."),
        // colorName: yup
        //   .string()
        //   .required("Phải có giá trị.")
        //   .min(2, "Phải ít nhất 2 ký tự."),
        // colorCode: yup
        //   .string()
        //   .required("Phải có giá trị.")
        //   .min(2, "Phải ít nhất 2 ký tự."),
    });
    return {
      productFormSchema,
      ProductLocal: [],
      message:''
    };
  },
  props:{
    id:{ type: String },
  },
  methods: {
   async getProductToEdit(){
    const a =await productService.getProductById(this.id);
    this.ProductLocal=a
   },
    async editProduct(){
      const dataUpdate={
        name:this.ProductLocal.name,
        price:this.ProductLocal.price,
        quanlity:this.ProductLocal.quanlity,
        imgUrl:this.ProductLocal.imgUrl,
        color:this.ProductLocal.color,
        description:this.ProductLocal.description,
      }
      
      const result= await productService.updateProduct(this.id,dataUpdate)
      if(result.status==200){
        this.message="Cập nhật thành công"
      }
   }
   
  },
  created() {
    this.getProductToEdit()
  },
};
</script>

<style>
@import "../../assets/css/add.css";
</style>
