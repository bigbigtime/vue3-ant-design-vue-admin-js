<template>
  <div class="account">
    <div id="bbbb">adsfasdfsd</div>
    <div class="form-wrap">
      <a-form
        name="custom-validation"
        ref="ruleForm"
      >
        <a-form-item>
          <label>用户名</label>
          <a-input type="text" autocomplete="off" />
        </a-form-item>

        <a-form-item>
          <label>密码</label>
          <a-input type="password" utocomplete="off" />
        </a-form-item>

        <a-form-item>
          <Captcha />
          <!-- <-Captcha></Captcha> -->
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>
            登录
          </a-button>
        </a-form-item>
      </a-form>
      <a-button type="primary" @click="submit">
            测试axios
      </a-button>
      <div class="text-center fs-12">
        <router-link to="/forget" class="color-white">忘记密码</router-link> | 
        <router-link to="/register" class="color-white">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, ref, getCurrentInstance } from "vue";
// API
import { GetCode } from "@/api/account";
// 局部组件（导入）
import Captcha from "@/components/Captcha";
export default {
  name: "Login",
  components: { Captcha },
  setup(props){
    // proxy 相当于 vue2.0 的 this 对象
    const { proxy } = getCurrentInstance();  // proxy 对象仅在“开发环境”可用，“属性“和“方法”---“生产环境”不能用，。
    console.log(getCurrentInstance())
    const formConfig = reactive({  // 类似于JSON对象的语法
      layout: {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
      }
    })
    const data = toRefs(formConfig);

    onMounted(() => {})

    const submit = () => {
      GetCode({id:"11", name:"vv"}).then(response => {

      })
    }
    /**
     * Promise 对象理解 
     */
    // const handlerPromise = () => {
    //   return new Promise((resolve, reject) => {
    //     resolve("总体");
    //   })
    // }

    // const promise_1 = () => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve("11111")
    //     }, 2000)
    //   })
    // }

    // const promise_2 = () => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve("2222")
    //     }, 1000)
    //   })
    // }

    // const promise_3 = () => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve("33333")
    //     }, 3000)
    //   })
    // }


    // Promise.race([promise_1(), promise_2(), promise_3()]).then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err);
    // })

    


















































    return {
      submit,
      ...data
    }
  }
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
