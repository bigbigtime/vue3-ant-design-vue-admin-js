<template>
  <a-modal v-model:visible="visible" :title="rowId ? '编辑用户' : '新增用户'" @cancel="close">
    <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="用户名" name="username">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="真实名称" name="truename">
        <a-input v-model:value="formState.truename" />
      </a-form-item>
      <a-form-item label="手机号" name="phone">
        <a-input v-model:value="formState.phone" />
      </a-form-item>
      <a-form-item label="身份证" name="cardId">
        <a-input v-model:value="formState.cardId" />
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
  emits: ["update:show", "aaa"],
  setup(props, context){

    const formState = reactive({
      username: "",
      truename: "",
      phone: "",
      cardId: "",
      role: "",
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
    })


    const close = () => {
      resetForm();
      context.emit("update:show", false);
      context.emit("update:rowId", "");
    }
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
      formRef
    }
  }
}
</script>
<style lang='scss' scoped>
</style>