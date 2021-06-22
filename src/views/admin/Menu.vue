<template>
    <a-row :gutter="30">
        <a-col :span="8">
            <div class="header-wrap">
                <h4>菜单列表</h4>
                <div class="button-group"><a-button type="primary">一级添加菜单</a-button></div>
            </div>
            <hr />
            <a-tree :tree-data="data.tree_data" :defaultExpandAll="true">
                <template #title="{ key: treeKey, title }">
                    <div class="menu-item">
                        <span>{{ title }}</span>
                        <div class="button-group">
                            <a-button class="button-mini" type="primary">添加子菜单</a-button>
                            <a-button class="button-mini">编辑</a-button>
                            <a-button class="button-mini">删除</a-button>
                        </div>
                    </div>
                </template>
            </a-tree>
        </a-col>
        <a-col :span="16">
            <div class="header-wrap">
                <h4>菜单信息</h4>
            </div>
            <hr />
            <div class="form-wrap">
            <a-form ref="formRef" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item label="当前菜单" name="phone">
                    <a-input />
                </a-form-item>
                <a-form-item label="菜单名称（中文）" name="username" v-model.value="field.menu_name_cn">
                    <a-input  />
                </a-form-item>
                <a-form-item label="菜单名称（英文）" name="username" v-model.value="field.menu_name_en">
                    <a-input />
                </a-form-item>
                <a-form-item label="路由名称" name="username" v-model.value="field.router_name">
                    <a-input />
                </a-form-item>
                <a-form-item label="页面路径" name="username" v-model.value="field.component">
                    <a-input />
                </a-form-item>
                <a-form-item label="图标" name="username" v-model.value="field.icon">
                    <a-upload
                        v-model:file-list="fileList"
                        name="avatar"
                        list-type="picture-card"
                        class="avatar-uploader"
                        :show-upload-list="false"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :before-upload="beforeUpload"
                        @change="handleChange"
                    >
                        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                        <div v-else>
                            <loading-outlined v-if="loading"></loading-outlined>
                            <plus-outlined v-else></plus-outlined>
                            <div class="ant-upload-text">Upload</div>
                        </div>
                    </a-upload>
                </a-form-item>
                <a-form-item label="页面路径" name="username" v-model.value="field.sort">
                    <a-input-number :min="1" :max="10" />
                </a-form-item>
                <a-form-item label="禁启用" name="status" v-model.value="field.disabled">
                    <a-radio-group :options="data.isOptions" />
                </a-form-item>
                <a-form-item label="页面缓存" name="status" v-model.value="field.keep">
                    <a-radio-group :options="data.isOptions" />
                </a-form-item>
                <a-form-item label="重定向" name="username" v-model.value="field.redirect">
                    <a-input />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
                    <a-button type="primary">确定添加</a-button>
                    <a-button>重置</a-button>
                </a-form-item>
            </a-form>
            </div>
        </a-col>
    </a-row>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
    name: "Menu",
    components: {},
    props: {},
    setup(){
        const data = reactive({
            tree_data: [
            {
                title: '系统设置',
                key: 'system',
                children: [
                    {
                        title: '角色管理',
                        key: 'role',
                        children: [
                            {
                                title: '角色管理',
                                key: 'role',
                                children: [
                    {
                        title: '角色管理',
                        key: 'role'
                    },
                    {
                        title: '用户列表',
                        key: 'user',
                        children: [
                    {
                        title: '角色管理',
                        key: 'role'
                    },
                    {
                        title: '用户列表',
                        key: 'user'
                    }
                ]
                    }
                ]
                            },
                            {
                                title: '用户列表',
                                key: 'user'
                            }
                        ]
                    },
                    {
                        title: '用户列表',
                        key: 'user'
                    }
                ]
            }],
            isOptions: [
                { label: '启用', value: '0' },
                { label: '禁用', value: '1' }
            ]
        })
        const form = reactive({
            field: {
                menu_name_cn: "",
                menu_name_en: "",
                router_name: "",
                component: "",
                icon: "",
                sort: "",
                disabled: "0",
                keep: "0",
                redirect: "",
                lang: "en",
            }
        })
        return {
            data,
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 14,
            },
            ...(toRefs(form))
        }
    }
}
</script>
<style lang='scss' scoped>
.header-wrap {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    height: 32px;
    .button-group {
        margin-left: auto;
    }
}
.menu-item {
    display: flex;
    align-items: center;
    .button-group {
        margin-left: auto;
    }
}
.form-wrap { width: 500px; }
:deep(.button-mini) {
    height: auto;
    padding: 5px 8px;
    font-size: 12px;
}
:deep(.ant-tree li .ant-tree-node-content-wrapper) { padding: 4px 5px; height: auto; }
:deep(.ant-tree li) {
    display: flex;
    flex-wrap: wrap;
}
:deep(.ant-tree li .ant-tree-node-content-wrapper) {
    flex: 1;
}
:deep(.ant-tree li ul) { width: 100%; }
</style>