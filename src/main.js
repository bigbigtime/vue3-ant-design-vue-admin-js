import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// and-design-vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// https://vue-i18n-next.intlify.dev/
// 语言
import VueI18n from "./language";

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .use(VueI18n)
  .mount("#app");
