<template>
    <a-sub-menu :key="menu.path">
        <template #title>
            <span>{{ menu.meta && menu.meta.title }}</span>
        </template>
        <template v-if="menu.children.length">
            <template v-for="item in menu.children">
                <!-- 不存在子级的栏目 -->
                <a-menu-item v-if="!item.children" :key="item.path">{{ item.meta && item.meta.title }}</a-menu-item>
                <!-- 存在子级栏目 -->
                <Menu v-else :menu="item" />
            </template>
        </template>
    </a-sub-menu>
</template>
<script>
export default {
    name: "Menu",
    props: {
        menu: {
            type: Object,  // array
            default: () => ({})
        }
    },
    setup(){
        
    }
}
</script>