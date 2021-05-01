<template>
  <div class="account">
    <div id="bbbb">adsfasdfsd</div>
    <div class="form-wrap">
      <a-form
        name="custom-validation"
        ref="ruleForm"
        :model="account_form"
        :rules="rules_form"
        @finish="handleFinish"
      >
        <a-form-item name="username" ref="username">
          <label>用户名</label>
          <a-input v-model:value="account_form.username" type="text" :disabled="input_diabled.username" autocomplete="off" @change="() => {$refs.username.onFieldChange()}" />
        </a-form-item>

        <a-form-item name="password" ref="pws">
          <label>密码</label>
          <a-input-password v-model:value="account_form.password" placeholder="请输入密码" @change="() => {$refs.pws.onFieldChange()}"/>
        </a-form-item>
     
        <a-form-item>
          <a-button type="primary" html-type="submit" block>登录</a-button>
        </a-form-item>
      </a-form>
      <div class="text-center fs-12">
        <router-link to="/forget" class="color-white">忘记密码</router-link> | 
        <router-link to="/register" class="color-white">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// antdesign
import { message } from 'ant-design-vue';
// API
import { Login } from "@/api/account";
// 导入验证类的方法
import { checkPhone, checkPassword as password } from "@/utils/verification";
import { onMounted, reactive, toRefs, ref } from "vue";
// 路由
import { useRouter } from "vue-router";
// 局部组件（导入）
import Captcha from "@/components/Captcha";
// 加密
import md5 from 'js-md5';
// cookies
import { setToken, setUsername, getToken } from "@/utils/cookies";
export default {
  name: "Login",
  components: { Captcha },
  setup(props){
    // js的语法
    /**
     * 1、js的语法跳转
     * 2、dom标签跳转
     */
    /**
     * 需要让用户返回上一个历史记录，就用push(追加一个历史记录)
     * 不让用户返回上一个历史记录，就用replace(替换了当前的历史记录)
     */
    const { replace } = useRouter();
    const checkUsername = async (rule, value, callback) => {
      if (!value) {
        dataItem.disabled_code_button = true;
        return Promise.reject('请输入用户名');            //不存在的情况
      }else if(!checkPhone(value)){
        dataItem.disabled_code_button = true;
        return Promise.reject('请输入11位数字的手机号');  //手机号错误的情况
      }else{
        // callback();
        // checkUsernameFn();
        dataItem.disabled_code_button = false;
        return Promise.resolve();
      }
    };
    /** 检验密码 */
    const checkPassword = async (rule, value, callback) => {
      const passwords = formConfig.account_form.passwords;
      if (!value) {
        return Promise.reject('请输入密码');            //不存在的情况
      }else if(!password(value)){
        return Promise.reject('请输入6~20位的，数字+英文');  //密码错误的情况
      }else{
        // callback();
        return Promise.resolve();
      }
    };
    // from表单
    const formConfig = reactive({  // 类似于JSON对象的语法
      layout: {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
      },
      account_form: {
        username: "",
        password: ""
      },
      input_diabled: {
        username: false
      },
      rules_form: {
        username: [{ validator: checkUsername, trigger: 'change' }],
        password: [{ validator: checkPassword, trigger: 'change' }]
      },
      
    })
    // data
    const dataItem = reactive({})
    const form = toRefs(formConfig);
    const data = toRefs(dataItem);
    
    /**
     * =============================================================
     * ================
     */
    // 提交表单
    const handleFinish = (value) => {
      const requestData = {
        username: formConfig.account_form.username,
        password: md5(formConfig.account_form.password)
      }
      Login(requestData).then(response => {
        const data = response.content;
        /**
         * 1、有可能存储的变量名称不同
         * 2、有可能要更新变量名称的情况
         */
        setToken({ token: data.token });
        setUsername({ value: data.username });

        setTimeout(() => {
          console.log(getToken())
        }, 2000);
      })
    }

    return {
      ...form,
      ...data,
      handleFinish
    }
  }
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
