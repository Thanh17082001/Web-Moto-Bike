import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../view/Home.vue";
import headerCom from "../components/layout/header.vue";
import footerCom from "../components/layout/Footer.vue";
import Product from "../view/productView.vue";
import Order from "../view/ShopOrder.vue";
import Cart from "../view/ShopCart.vue";
import searchProduct from "../view/ProductSearch.vue";
import productDetail from "../components/product/ProductDetail.vue";
import Introduce from "../view/Introduce.vue";
import newsPage from "../view/news.vue";
import registerPage from "../view/RegisterAccount.vue";
import loginPage from "../view/LoginAccount.vue";
import adminHomePage from "../view/AdminHomepage.vue";
import addForm from "../components/admin/ProductForm.vue";
import adminProduct from "../components/admin/ProductAll.vue";
import trashProduct from "../components/admin/AdminTrashProduct";
import updateProduct from "../components/admin/ProductFormEdit.vue";
import newsAdmin from "../components/admin/AdminNews.vue";
import orderAdmin from "../components/admin/AdminOrder.vue";
import statisticalView from "../view/StatisticalView.vue";

const routes = [
  {
    path: "/",
    components: {
      default: Home,
      "page-header": headerCom,
      "page-footer": footerCom,
    },
    meta: { title: "Home page" },
  },
  {
    path: "/product",
    components: {
      default: Product,
      "page-header": headerCom,
      "page-footer": footerCom,
    },
    meta: { title: "San pham" },
  },
  {
    path: "/history-order",
    components: {
      default: Order,
      "page-header": headerCom,
      "page-footer": footerCom,
    },
    meta: { title: "San pham" },
  },
  {
    path: "/cart",
    components: {
      default: Cart,
      "page-header": headerCom,
      "page-footer": footerCom,
    },
    meta: { title: "Giỏ hàng" },
  },
  {
    path: "/product-detail/:id",
    name: "product.detail",
    components: {
      default: productDetail,
      "page-header": headerCom,
      "page-footer": footerCom,
    },
    meta: { title: "Chi tiết sản phẩm" },
   
    props: true,
  },
  {
    path: "/search/:searchString",
    name: "product.search",
    components: {
      default: searchProduct,
      "page-header": headerCom,
      "page-footer": footerCom,
    },
    meta: { title: "Chi tiết sản phẩm" },
   props:true
  },
  { path: "/introduce",  components: {
    default: Introduce,
    "page-header": headerCom,
    "page-footer": footerCom,
  }, meta: { title: "Gioi thieu" } },
  { path: "/news", components: {
    default: newsPage,
    "page-header": headerCom,
    "page-footer": footerCom,
  }, meta: { title: "Tin tuc" } },
  {
    path: "/register",
    components: {
      default: registerPage,
      "page-header": headerCom,
      "page-footer": footerCom,
    },
    meta: { title: "Đăng ký" },
  },
  {
    path: "/login",
    components: {
      default: loginPage,
      "page-header": headerCom,
      "page-footer": footerCom,
    },
    meta: { title: "Đăng nhập" },
  },
  {
    path: "/admin",
    name: "admin",
    beforeEnter:(to, from, next)=>{
      const getAdmin = JSON.parse(sessionStorage.getItem('user'))
      if(getAdmin){
        if(getAdmin.isAdmin){
          return next()
        }
        
      }else{
        return next('/')
      }
    },
    component: adminHomePage,
    children: [
      { path: "product", component: adminProduct, meta: { title: "Admin" } },
      { path: "add", component: addForm, meta: { title: "thêm sản phẩm" } },
      { path: "trash", component: trashProduct, meta: { title: "Thùng rác" } },
      { path: "news", component: newsAdmin, meta: { title: "Quản lý tin tức" } },
      { path: "order", component: orderAdmin, meta: { title: "Quản lý đơn hàng" } },
      { path: "statistical", component: statisticalView, meta: { title: "Thống kê" } },
      {
        path: "/update/:id",
        name: "product.edit",
        component: updateProduct,
        props: true,
        meta: { title: "Chỉnh sửa" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  document.title = to.meta.title;
});
export default router;
