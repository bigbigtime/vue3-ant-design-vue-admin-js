<template>
  <div class="login">
    登录
    <a-button>按钮</a-button>
    <a-button type="primary">
      Primary
    </a-button>
    <a-button>Default</a-button>
    <a-button type="dashed">
      Dashed
    </a-button>
    <a-button type="danger">
      Danger
    </a-button>
    <a-config-provider :auto-insert-space-in-button="false">
      <a-button type="primary">
        按钮
      </a-button>
    </a-config-provider>
    <a-button type="primary">
      按钮
    </a-button>
    <a-button type="link">
      Link
    </a-button>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>
