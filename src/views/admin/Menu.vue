<template>
    <a-row :gutter="30">
        <a-col :span="8">
            <div class="header-wrap">
                <h4>菜单列表</h4>
                <div class="button-group"><a-button type="primary" @click="handlerCategory('first_category_add')">一级添加菜单</a-button></div>
            </div>
            <hr />
            <a-tree :tree-data="data.tree_data" :defaultExpandAll="true" >
                <template #title="{ menu_id, menu_name_cn }">
                    <div class="menu-item">
                        <span>{{ menu_name_cn }}</span>
                        <div class="button-group">
                            <a-button class="button-mini" type="primary" @click="handlerCategory('child_category_add', menu_id)">添加子菜单</a-button>
                            <a-button class="button-mini" @click="handlerCategory('category_edit', menu_id)">编辑</a-button>
                            <a-button class="button-mini" @click="handlerDelete(menu_id)">删除</a-button>
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
            <a-spin :spinning="data.spinning">
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
                <a-form-item label="隐藏路由" name="hidden">
                    <a-radio-group :options="data.isOptions" v-model:value="field.hidden" />
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
                <a-form-item label="页面元素" name="redirect">
                    <a-row :gutter="16">
                        <a-col class="gutter-row" :span="8">
                            元素
                        </a-col>
                        <a-col class="gutter-row" :span="8">
                            标识
                        </a-col>
                    </a-row>
                    <a-row :gutter="16" v-for="(item, index) in data.elem_item" :key="item.id">
                        <a-col class="gutter-row" :span="8">
                            <a-input v-model:value.trim="item.label" />
                        </a-col>
                        <a-col class="gutter-row" :span="8">
                            <a-input v-model:value.trim="item.value"/>
                        </a-col>
                        <a-col class="gutter-row" :span="8">
                            <a-button @click="handlerElemDel(index)">删除</a-button>
                        </a-col>
                    </a-row>
                    <a-button size="small" @click="handlerElemAdd">添加页面功能</a-button>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
                    <a-button type="primary" html-type="submit" :disabled="!data.menu_type" :loading="data.submit_loading">
                        确定{{ data.menu_type === "category_edit" ? "修改" : "添加" }}
                    </a-button>
                    <a-button>重置</a-button>
                </a-form-item>
            </a-form>
            </a-spin>
            </div>
        </a-col>
    </a-row>
</template>

<script>
import { ref, reactive, toRefs, onBeforeMount, getCurrentInstance } from "vue";
// API
import { MenuCreate, MenuListTree, MenuList, MenuDetailed, MenuUpdate, MenuRemove } from "@/api/menu";
// antdesign
import { message } from 'ant-design-vue';
// utils
import { requestDataFormat } from "@/utils/formatData";
export default {
    name: "Menu",
    components: {},
    props: {},
    setup(){
        const { proxy } = getCurrentInstance();
        const json = { label: "", value: "" };
        const data = reactive({
            tree_data: [],
            isOptions: [
                { label: '启用', value: '0' },
                { label: '禁用', value: '1' }
            ],
            menu_type: "",
            menu_id: 0,
            submit_loading: false,
            spinning: false,
            row_id: 0,
            elem_item: [JSON.parse(JSON.stringify(json))]
        })
        const form = reactive({
            field: {
                menu_name_cn: "",
                menu_name_en: "",
                router_name: "",
                component: "",
                icon: "",
                sort: "",
                hidden: "0",
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
        const handlerCategory = (type, menu_id) => {
            // 标记类型
            data.menu_type = type;
            // 菜单ID
            data.menu_id = menu_id || 0;
            // 重置表单
            handlerRrsetFeild();
            //
            if(data.menu_type === "category_edit") {
                handlerMenuDetailed();
            }
        }
        /** 表单提交 */
        const handleFinish = () => {
            if(data.menu_type === "category_edit") { handlerMenuEdit(); }
            if(data.menu_type === "first_category_add" || data.menu_type === "child_category_add") { handlerFirstCategoryAdd(); }
        
        }
        /** 一级菜单添加 */
        const handlerFirstCategoryAdd = () => {
            data.submit_loading = true;
            // parent_id
            const request_data = {};
            if(data.menu_type === "child_category_add") { request_data.parent_id = data.menu_id; }
            // 页面元素数据参数
            const elem_data = JSON.stringify(formatElemData());
            MenuCreate({...form.field, ...request_data, elem: elem_data}).then(response => {
                data.submit_loading = false;
                message.success("添加成功");
                handlerRrsetFeild();
                data.menu_type = "";
                getMenuList();
            }).catch(error => {
                data.submit_loading = false;
            })
        } 
        /** 清除表单数据 */
        const formDom = ref(null);
        const handlerRrsetFeild = () => {
            formDom.value.resetFields();
            data.elem_item = [JSON.parse(JSON.stringify(json))]
        }
        const getMenuListTree = () => {
            MenuListTree().then(response => {
                data.tree_data = response.content;
            })
        }
        const getMenuList = () => {
            MenuList().then(response => {
                const response_data = response.content;
                data.tree_data = formatTree({
                    data: response_data, 
                    id: "menu_id", 
                    parent_id: "parent_id", 
                    child: "children",
                    root: 0
                });
                console.log(response_data)
            })
        }

        const formatTree = (params) => {  // 自己调用自己
            const tree = [];
            if(params.data.length > 0) {
                params.data.forEach(item => {
                    // 获取顶层菜单，parent_id === 0
                    if(item[params.parent_id] === params.root) {
                        const child = formatTree({
                            data: params.data, 
                            id: params.id, 
                            parent_id: params.parent_id, 
                            child: params.child,
                            root: item[params.id]
                        });
                        if(child) {
                            item[params.child] = child;
                        }
                        tree.push(item);
                    }
                })
            }
            return tree;
        }

        /**
         * 获取菜单详情
         */
        const handlerMenuDetailed = () => {
            if(data.spinning) { return false; }
            // 添加表单的遮罩
            data.spinning = true;
            MenuDetailed({menu_id: data.menu_id}).then(response => {
                requestDataFormat({
                    data: response.content,
                    form: form.field
                })
                data.spinning = false;
                // 页面元素
                let elem_data = response.content.elem;
                if(elem_data) {
                    data.elem_item = JSON.parse(elem_data);
                }
            }).catch(error => {
                data.spinning = false;
            })
        }

        /**
         * 修改菜单
         */
        const handlerMenuEdit = () => {
            data.submit_loading = true;
            // 页面元素数据参数
            const elem_data = JSON.stringify(formatElemData());
            MenuUpdate({...form.field, menu_id: data.menu_id, elem: elem_data}).then(response => {
                data.submit_loading = false;
                message.success("修改成功");
                handlerRrsetFeild();
                data.menu_type = "";
                getMenuList();
            })
        }

        /**
         * 删除菜单
         */
        const handlerDelete = (id) => {
            data.row_id = id;
            proxy.deleteConfirm({
                ok_fun: () => handlerDeleteApi()
            });
            
        }

        const handlerDeleteApi = () => {
            MenuRemove({menu_id: data.row_id}).then(resonse => {
                getMenuList();
            })
        }

        /** 添加页面元素功能 */
        const handlerElemAdd = () => {
            data.elem_item.push(JSON.parse(JSON.stringify(json)))
        }
        /** 删除页面元素功能 */
        const handlerElemDel = (index) => {
            data.elem_item.splice(index, 1);
        }
        /** 页面元素数据格式化 */
        const formatElemData = () => {
            const elem_data = JSON.parse(JSON.stringify(data.elem_item));
            const arr = [];
            elem_data.forEach(item => {
                if(item.label && item.value) {
                    arr.push(item);
                }
            })
            return arr;
        }

        onBeforeMount(() => {
            // getMenuListTree();
            getMenuList();
        })
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
            handlerCategory,
            handlerDelete,
            handlerElemAdd,
            handlerElemDel
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