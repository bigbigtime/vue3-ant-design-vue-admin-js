<template>
    <h1 id="logo">
        <img v-if="collapsed" :src="data.logo_min" alt="手把手撸码前端 1371374684" />
        <img v-else :src="data.logo" alt="手把手撸码前端 1371374684" />
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
                <a-menu-item v-if="hasOnlyChildren(item)" :key="item.path">
                    <router-link :to="item.children[0].path">
                        <span class="anticon">
                            <svg-icon :iconName="item.meta && item.meta.icon" className="aside-svg"></svg-icon>
                        </span>
                        <span>{{ item.children[0].meta && item.children[0].meta.title }}</span>
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
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    setup(){
        const { options } = useRouter();
        // 路由
        const rotuers = options.routes;
        // 数据
        const data = reactive({
            selectedKeys: localStorage.getItem("selectedKeys") ? [localStorage.getItem("selectedKeys")] : [],
            openKeys: localStorage.getItem("openKeys") ? JSON.parse(localStorage.getItem("openKeys")) : [],
            logo: require("@/assets/images/logo.png"),
            logo_min: require("@/assets/images/logo-min.png"),
        })

        // 选择菜单
        const selectMenu = ({ item, key, keyPath }) => {
            data.selectedKeys = [key];
            localStorage.setItem("selectedKeys", key) // 设置
        }
        // 展开/关闭菜单
        const openMenu = (openKeys) => {
            data.openKeys = openKeys;
            localStorage.setItem("openKeys", JSON.stringify(openKeys)) // 设置
        }
        // 检测是否只有一个子路由
        const hasOnlyChildren = (data) => {
            // 不存在子级的情况
            if(!data.children) { return false; }
            // 过滤隐藏的子级路由
            const routers = data.children.filter(item => item.hidden ? false : true);
            // 判断最终结果 
            if(routers.length === 1) { return true; }
            return false;
        }

        return {
            data,
            rotuers,
            selectMenu,
            openMenu,
            hasOnlyChildren
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