<template>
    <a-sub-menu :key="menu.path">
        <template #title>
            <span class="anticon">
                <svg-icon :iconName="menu.meta && menu.meta.icon" className="aside-svg"/>
            </span>
            <span>{{ menu.meta && menu.meta.title }}</span>
        </template>
        <template v-if="menu.children.length">
            <template v-for="item in menu.children">
                <template v-if="!item.hidden">
                    <!-- 不存在子级的栏目 -->
                    <a-menu-item v-if="!item.children" :key="item.path">
                        <router-link :to="item.path">{{ item.meta && item.meta.title }}</router-link>
                    </a-menu-item>
                    <!-- 存在子级栏目 -->
                    <Menu v-else :menu="item" :key="item.path" />
                </template>
            </template>
        </template>
    </a-sub-menu>
</template>
<script>
export default {
    name: "Menu",
    components: {},
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
<style lang="scss" scoped>
.aside-menu {
    i.icon { 
        margin-right: 5px;
        opacity: .6;
    }
    .ant-menu-submenu-open {
        > div {
            i.icon {  opacity: 1; }
        }
    }
}
</style>