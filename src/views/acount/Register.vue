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

        <a-form-item name="password">
          <label>密码</label>
          <a-input v-model:value="account_form.password" type="password" utocomplete="off" />
        </a-form-item>

        <a-form-item name="passwords">
          <label>确认密码</label>
          <a-input v-model:value="account_form.passwords" type="password" utocomplete="off" />
        </a-form-item>

        <a-form-item name="code">
          <label>验证码</label>
          <a-row :gutter="15">
            <a-col :span="14"><a-input maxlength="6" v-model:value="account_form.code" type="text" utocomplete="off" /></a-col>
            <a-col :span="10">
              <a-button 
              type="primary" 
                @click="getCode"
                block 
                :disabled="disabled_code_button" 
                :loading="button_loading">
              {{ button_text }}
              </a-button>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item>
          <Captcha />
          <!-- <-Captcha></Captcha> -->
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>
            注册
          </a-button>
        </a-form-item>
      </a-form>
      <div class="text-center fs-12">
        <router-link to="/forget" class="color-white">忘记密码</router-link> | 
        <router-link to="/" class="color-white">登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// antdesign
import { message } from 'ant-design-vue';
// API
import { ChekcUsername } from "@/api/account";
// 导入验证类的方法
import { checkPhone, checkPassword as password, checkCode as code } from "@/utils/verification";
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
      }else if(passwords && value && (passwords !== value)){  // 必须是两个密码都存在的情况下，才会检测密码是否一致。否则不检测
        return Promise.reject('两次密码不一致');  //密码错误的情况
      }else{
        // callback();
        return Promise.resolve();
      }
    };
    /** 检验重置密码 */
    const checkPasswords = async (rule, value, callback) => {
      const pas = formConfig.account_form.password;
      if (!value) {
        return Promise.reject('请再次输入密码');            //不存在的情况
      }else if(!password(value)){
        return Promise.reject('请输入6~20位的，数字+英文');  //密码错误的情况
      }else if(pas && value && (pas !== value)){
        return Promise.reject('两次密码不一致');  //密码错误的情况
      }else{
        // callback();
        return Promise.resolve();
      }
    };
    /** 检验验证码 */
    const checkCode = async (rule, value, callback) => {
      if (!value) {
        return Promise.reject('请输入验证码');            //不存在的情况
      }else if(!code(value)){
        return Promise.reject('请输入6位的数字+英文');  //密码错误的情况
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
        password: "",
        passwords: "",
        code: ""
      },
      input_diabled: {
        username: false
      },
      rules_form: {
        username: [{ validator: checkUsername, trigger: 'change' }],
        password: [{ validator: checkPassword, trigger: 'change' }],
        passwords: [{ validator: checkPasswords, trigger: 'change' }],
        code: [{ validator: checkCode, trigger: 'change' }]
      },
      
    })
    // data
    const dataItem = reactive({
      // 获取验证码按钮
      button_text: "获取验证码",
      button_loading: false,
      disabled_code_button: true,
      sec: 60,
      // 定时器
      timer: null
    })
    const form = toRefs(formConfig);
    const data = toRefs(dataItem);
    
    /**
     * =============================================================
     * ================
     */
    // 提交表单
    const handleFinish = (value) => {
      console.log(value)
    }
    // 获取验证码
    const getCode = () => {
      // 用户名不存在的情况
      if(!formConfig.account_form.username) {
        message.error('用户名不能为空');
        return false;
      }
      // 优先判断定时器是否存在，存在则先清除后再开启
      dataItem.timer && clearInterval(dataItem.timer);
      // 开启定时器
      dataItem.timer = setInterval(() => {
        const s = dataItem.sec--;
        dataItem.button_text = `${s}秒`;
        if(s <= 0) {
          clearInterval(dataItem.timer);
          dataItem.button_text = `重新获取`;
        }
      }, 1000)
    }

    const checkUsernameFn = () => {
      formConfig.input_diabled.username = true;
      ChekcUsername({username: formConfig.account_form.username}).then(response => {
        formConfig.input_diabled.username = false;
      }).catch(error => {
        formConfig.input_diabled.username = false;
      })
    }

    onMounted(() => {})

    return {
      ...form,
      ...data,
      handleFinish,
      getCode
    }
  }
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
