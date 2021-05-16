import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// and-design-vue
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/antd.css';
// router 拦截
import "./router/permit";
// https://vue-i18n-next.intlify.dev/
// axios
import Axios from "axios";
// 语言
import VueI18n from "./language";
// svg全局组件
import SvgIcon from "@/components/Svgicon";
// svg文件解析
import "./js/svg";

const app = createApp(App);
// 注入Axios
app.config.globalProperties.$axios = Axios;

app
  .use(store)
  .use(router)
  .use(Antd)
  .use(VueI18n)
  .component("svg-icon", SvgIcon)
  .mount("#app");
