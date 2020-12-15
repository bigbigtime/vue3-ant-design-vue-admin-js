<template>
    <a-menu
        v-model:openKeys="data.openKeys"
        v-model:selectedKeys="data.selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
    >
        <template v-for="item in rotuers">
            <template v-if="!item.hidden">
                <!--这里是一级-->
                <a-menu-item v-if="!item.children" :key="item.path">{{ item.meta && item.meta.title }}</a-menu-item>
                
                <!--这里是子级-->
                <a-sub-menu v-else :key="item.path">
                    <template #title>
                        <span>{{ item.meta && item.meta.title }}</span>
                    </template>
                    <template v-if="item.children.length">
                        <a-menu-item :key="child.path" v-for="child in item.children">{{ child.meta && child.meta.title }}</a-menu-item>
                    </template>
                </a-sub-menu>
            </template>
        </template>
        
    </a-menu>
</template>
<script>
import { reactive } from "vue";
// 路由
import { useRoute, useRouter } from "vue-router";
export default {
    name: "Aside",
    setup(){
        const { options } = useRouter();
        // 路由
        const rotuers = options.routes;
        // 数据
        const data = reactive({
            selectedKeys: ['2'],
            openKeys: ['/adminIndex']
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