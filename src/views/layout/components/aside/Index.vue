<template>
    <a-menu
        v-model:openKeys="data.openKeys"
        v-model:selectedKeys="data.selectedKeys"
        mode="inline"
        theme="dark"
    >
        <template v-for="item in rotuers">
            <template v-if="!item.hidden">
                <!--这里是一级-->
                <a-menu-item v-if="!item.children" :key="item.path">{{ item.meta && item.meta.title }}</a-menu-item>
                
                <!--这里是子级-->
                <Menu v-else aaa="11" :menu="item" />
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
            selectedKeys: ['2'],
            openKeys: ['/adminIndex'],
            abc: 11
        })

        return {
            data,
            rotuers
        }
    }
}
</script>
<style lang="scss" scoped>

</style>