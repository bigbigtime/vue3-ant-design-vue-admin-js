// 语言
import { createI18n } from 'vue-i18n'
const i18n = createI18n({
  locale: 'ch',  // 默认语言
  messages: {
    ch: require("./ch.js"),
    en: require("./en.js"),
    jp: require("./jp.js"),
  }
})
export default i18n;