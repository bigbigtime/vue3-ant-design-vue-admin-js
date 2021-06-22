<template>
    <a-row :gutter="30">
        <a-col :span="8">
            <div class="header-wrap">
                <h4>菜单列表</h4>
                <div class="button-group"><a-button type="primary" @click="handlerCategory('first_category_add')">一级添加菜单</a-button></div>
            </div>
            <hr />
            <a-tree :tree-data="data.tree_data" :defaultExpandAll="true">
                <template #title="{ key: treeKey, title }">
                    <div class="menu-item">
                        <span>{{ title }}</span>
                        <div class="button-group">
                            <a-button class="button-mini" type="primary" @click="handlerCategory('child_category_add')">添加子菜单</a-button>
                            <a-button class="button-mini" @click="handlerCategory('category_edit')">编辑</a-button>
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
            <a-form ref="formDom" @finish="handleFinish" :model="field" :rules="rules_form" :label-col="labelCol" :wrapper-col="wrapperCol">
                <!-- <a-form-item label="当前菜单" name="phone">
                    <a-input />
                </a-form-item> -->
                <a-form-item label="菜单名称（中文）" name="menu_name_cn" >
                    <a-input v-model:value="field.menu_name_cn" />
                </a-form-item>
                <a-form-item label="菜单名称（英文）" name="menu_name_en">
                    <a-input  v-model:value="field.menu_name_en" />
                </a-form-item>
                <a-form-item label="Path路径" name="router_path">
                    <a-input  v-model:value="field.router_path"/>
                </a-form-item>
                <a-form-item label="路由名称" name="router_name">
                    <a-input  v-model:value="field.router_name"/>
                </a-form-item>
                <a-form-item label="页面路径" name="component">
                    <a-input v-model:value="field.component" />
                </a-form-item>
                <a-form-item label="图标" name="icon">
                    <a-upload
                        v-model:file-list="field.icon"
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
                <a-form-item label="排序" name="sort">
                    <a-input-number :min="1" :max="10" v-model:value="field.sort" />
                </a-form-item>
                <a-form-item label="禁启用" name="disabled">
                    <a-radio-group :options="data.isOptions" v-model:value="field.disabled" />
                </a-form-item>
                <a-form-item label="页面缓存" name="keep">
                    <a-radio-group :options="data.isOptions" v-model:value="field.keep" />
                </a-form-item>
                <a-form-item label="重定向" name="redirect">
                    <a-input  v-model:value="field.redirect"/>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
                    <a-button type="primary" html-type="submit" :disabled="!data.menu_type" :loading="data.submit_loading">确定添加</a-button>
                    <a-button>重置</a-button>
                </a-form-item>
            </a-form>
            </div>
        </a-col>
    </a-row>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
// API
import { MenuCreate } from "@/api/menu";
// antdesign
import { message } from 'ant-design-vue';
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
            ],
            menu_type: "",
            submit_loading: false
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
            },
            rules_form: {
                menu_name_cn: [{ required: true, message: "请输入中文名称", trigger: 'blur' }],
                menu_name_en: [{ required: true, message: "请输入英文名称", trigger: 'blur' }],
                router_name: [{ required: true, message: "请输入路由名称", trigger: 'blur' }],
                component: [{ required: true, message: "请输入组件路由", trigger: 'blur' }]
            },
        })
        /** 菜单添加 */
        const handlerCategory = (type) => {
            // 标记类型
            data.menu_type = type;
            handlerRrsetFeild();
        }
        /** 表单提交 */
        const handleFinish = () => {
            if(data.menu_type === "first_category_add") { handlerFirstCategoryAdd(); }
        }
        /** 一级菜单添加 */
        const handlerFirstCategoryAdd = () => {
            data.submit_loading = true;
            MenuCreate(form.field).then(response => {
                data.submit_loading = false;
                message.success("添加成功");
                handlerRrsetFeild();
                data.menu_type = "";
            }).catch(error => {
                data.submit_loading = false;
            })
        } 
        /** 清除表单数据 */
        const formDom = ref(null);
        const handlerRrsetFeild = () => {
            formDom.value.resetFields();
        }
        return {
            data,
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 14,
            },
            ...(toRefs(form)),
            handleFinish,
            formDom,
            handlerCategory
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