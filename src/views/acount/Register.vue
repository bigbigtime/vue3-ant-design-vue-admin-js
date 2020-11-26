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
        <a-form-item name="username">
          <label>用户名</label>
          <a-input v-model:value="account_form.username" type="text" autocomplete="off" />
        </a-form-item>

        <a-form-item>
          <label>密码</label>
          <a-input v-model="account_form.password" type="password" utocomplete="off" />
        </a-form-item>

        <a-form-item>
          <label>确认密码</label>
          <a-input v-model="account_form.passwords" type="password" utocomplete="off" />
        </a-form-item>

        <a-form-item>
          <label>验证码</label>
          <a-row :gutter="15">
            <a-col :span="14"><a-input v-model="account_form.code" type="password" utocomplete="off" /></a-col>
            <a-col :span="10"><a-button type="primary" block>获取验证码</a-button></a-col>
          </a-row>
          
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
      <div class="text-center fs-12">
        <a href="" class="color-white">忘记密码</a> | 
        <a href="" class="color-white">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
// 导入验证类的方法
import { checkPhone } from "@/utils/verification";
import { onMounted, reactive, toRefs, ref } from "vue";
// 局部组件（导入）
import Captcha from "@/components/Captcha";
export default {
  name: "Login",
  components: { Captcha },
  setup(props){
    const checkUsername = async (rule, value, callback) => {
      if (!value) {
        return Promise.reject('请输入用户名');            //不存在的情况
      }else if(!checkPhone(value)){
        return Promise.reject('请输入11位数字的手机号');  //手机号错误的情况
      }else{
        // callback();
        return Promise.resolve();
      }
    };
    const formConfig = reactive({  // 类似于JSON对象的语法
      layout: {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
      },
      account_form: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules_form: {
        username: [{ validator: checkUsername, trigger: 'change' }]
      }
    })
    const data = toRefs(formConfig);

    // 提交表单
    const handleFinish = () => {
      alert(111)
    }

    onMounted(() => {})

    return {
      ...data,
      handleFinish
    }
  }
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
