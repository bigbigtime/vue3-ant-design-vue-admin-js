<template>
    <h1 id="logo">
        <img :src="data.logo" alt="手把手撸码前端 1371374684" />
    </h1>
    <a-menu
        class="aside-menu"
        v-model:openKeys="data.openKeys"
        v-model:selectedKeys="data.selectedKeys"
        mode="inline"
        theme="dark"
        @click="selectMenu"
        @openChange="openMenu"
    >
        <template v-for="item in rotuers">
            <template v-if="!item.hidden">
                <!--这里是一级-->
                <a-menu-item v-if="!item.children" :key="item.path">
                    <router-link :to="item.path">
                        <i class="icon icon-size-21 mb--5" :class="item.meta && item.meta.icon"></i>
                        {{ item.meta && item.meta.title }}
                    </router-link>
                </a-menu-item>
                
                <!--这里是子级-->
                <Menu v-else :menu="item" :key="item.path" />
            </template>
        </template>
    </a-menu>
</template>
<script>
import { reactive } from "vue";
// 路由
import { useRoute, useRouter } from "vue-router";
// 组件
import Menu from "./Menu";
export default {
    name: "Aside",
    components: { Menu },
    setup(){
        const { options } = useRouter();
        // 路由
        const rotuers = options.routes;
        // 数据
        const data = reactive({
            selectedKeys: localStorage.getItem("selectedKeys") ? [localStorage.getItem("selectedKeys")] : [],
            openKeys: localStorage.getItem("openKeys") ? [localStorage.getItem("openKeys")] : [],
            logo: require("@/assets/images/logo.png")
        })

        // 选择菜单
        const selectMenu = ({ item, key, keyPath }) => {
            data.selectedKeys = [key];
            localStorage.setItem("selectedKeys", key) // 设置
        }
        // 展开/关闭菜单
        const openMenu = (openKeys) => {
            data.openKeys = openKeys;
            localStorage.setItem("openKeys", openKeys) // 设置
        }

        return {
            data,
            rotuers,
            selectMenu,
            openMenu
        }
    }
}
</script>
<style lang="scss" scoped>
#logo {
    padding: 24px 0 20px;
    border-bottom: 1px solid #000;
    text-align: center;
    img { display: inline-block; }
}
.aside-menu {
    i.icon { 
        margin-right: 5px;
        opacity: .6;
    }
    .ant-menu-item-selected {
        i.icon { opacity: 1; }
    }
}
</style>