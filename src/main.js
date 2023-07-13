import { createApp } from 'vue'
import App from './App.vue'
import router  from './router'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';

// Cấu hình CORS mặc định cho tất cả các yêu cầu Axios
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const app=createApp(App);
app.use(router)
app.mount('#app')

