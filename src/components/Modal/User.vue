<template>
  <a-modal v-model:visible="visible" :title="title" @cancel="close">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
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
    title: {
      type: String,
      default: ""
    }
  },
  emits: ["update:show", "aaa"],
  setup(props, context){

    const visible = ref(false);
    watch(() => props.show, (newValue, oldValue) => {
      visible.value = newValue;
    })

    const close = () => {
      context.emit("update:show", false)
    }
    
    return {
      visible,
      close
    }
  }
}
</script>
<style lang='scss' scoped>
</style>