<template>
  <a-modal v-model:visible="visible" :title="rowId ? '编辑用户' : '新增用户'" @cancel="close" :confirm-loading="data.confirmLoading" @ok="handleOk">
    <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="手机号" name="phone">
        <a-input v-model:value="formState.phone" />
      </a-form-item>
      <a-form-item label="用户名" name="username">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="真实名称" name="truename">
        <a-input v-model:value="formState.truename" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input v-model:value="formState.password" />
      </a-form-item>
      <a-form-item label="身份证" name="card_id">
        <a-input v-model:value="formState.card_id" />
      </a-form-item>
      <a-form-item label="角色类型" name="role">
        <a-radio-group :options="roleOptions" v-model:value="formState.role" />
      </a-form-item>
      <a-form-item label="禁启用" name="status">
        <a-radio-group :options="isOptions" v-model:value="formState.status" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { reactive, ref, onMounted, watch } from 'vue';
// API
import { UserCreate, UserInfo, UserUpdate } from "@/api/user";
// 加密
import md5 from 'js-md5';
// antdesign
import { message } from 'ant-design-vue';
// utils
import { requestDataFormat } from "@/utils/formatData";
export default {
  name: '',
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    rowId: {
      type: [Number, String],
      default: ""
    }
  },
  emits: ["update:show", "update:rowId", "loadData"],
  setup(props, context){
    const data = reactive({
      confirmLoading: false
    })
    let formState = reactive({
      username: "",
      truename: "",
      phone: "",
      card_id: "",
      role: "",
      password: "",
      status: true
    });
    const roleOptions = [
      { label: '超管', value: 'admin' },
      { label: '产品管理员', value: 'product' },
      { label: '用户管理', value: 'user' },
    ];
    const isOptions = [
      { label: '启用', value: true },
      { label: '禁用', value: false }
    ];


    const visible = ref(false);
    watch(() => props.show, (newValue, oldValue) => {
      visible.value = newValue;
      // 用户详情请求
      (props.rowId && newValue) && getUserInfo();
    })

    const getUserInfo = () => {
      UserInfo({member_id: props.rowId}).then(response => {
        // requestDataFormat(response.content, formState, ["status", "type"]); 
        requestDataFormat({
          data: response.content,
          form: formState,
          match: ["status", "type"]
        }); 
      })
    }
    // 关闭按钮事件
    const close = () => {
      resetForm();
      data.member_id = "";
      context.emit("update:show", false);
      context.emit("update:rowId", "");
    }
    // 确认按钮事件
    const handleOk = () => {
      props.rowId ? handlerUserEdit() : handlerUserAdd();
    }

    // 用户新增
    const handlerUserAdd = () => {
      data.confirmLoading = true;
      // 密码加密
      const request_data = Object.assign({}, formState);
      request_data.password = md5(request_data.password);
      UserCreate(formState).then(response => {
        const response_data = response.content;
        // 还原加载状态
        data.confirmLoading = false;
        // 用户存在
        if(!response_data.user) {
          message.error(response.msg);
          return false;
        }
        // 用户新增成功
        message.error(response.msg);
        close();
        context.emit("loadData");
      }).catch(error => {
        data.confirmLoading = false;
      })
    }
    // 用户编辑
    const handlerUserEdit = () => {
      data.confirmLoading = true;
      // 密码加密
      const request_data = Object.assign({}, formState);
      if(request_data.password) {
        request_data.password = md5(request_data.password);
      }else{
        delete request_data.password
      }
      UserUpdate({...request_data, member_id:props.rowId}).then(response => {
        const response_data = response.content;
        // 还原加载状态
        data.confirmLoading = false;
        // 用户新增成功
        message.error(response.msg);
        close();
        context.emit("loadData");
      }).catch(error => {
        data.confirmLoading = false;
      })
    }
    // 获取form表单
    const formRef = ref(null);
    const resetForm = () => {
      formRef.value.resetFields();
    }
    
    
    return {
      visible,
      close,
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 14,
      },
      formState,
      roleOptions,
      isOptions,
      formRef,
      data,
      handleOk
    }
  }
}
</script>
<style lang='scss' scoped>
</style>