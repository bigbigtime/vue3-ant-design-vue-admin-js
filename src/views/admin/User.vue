<template>
    <a-row type="flex" class="mb-20">
        <a-col flex="auto">
            <a-form layout="inline" :model="form_search" ref="form_search_refs">
                <a-form-item label="角色类型" name="role">
                    <a-select style="width: 120px" ref="select">
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                        <a-select-option value="disabled">Disabled</a-select-option>
                        <a-select-option value="Yiminghe">yiminghe</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="状态" name="status">
                    <a-select style="width: 120px" ref="select" v-model:value="form_search.status">
                        <a-select-option value="">全部</a-select-option>
                        <a-select-option :value="true">启用</a-select-option>
                        <a-select-option :value="false">禁用</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="关键字" name="keyword">
                    <a-select style="width: 120px" ref="select" v-model:value="form_search.key">
                        <a-select-option value="username">用户名</a-select-option>
                        <a-select-option value="truename">真实姓名</a-select-option>
                        <a-select-option value="phone">手机号</a-select-option>
                    </a-select>
                    <a-input-search
                        v-model:value="form_search.keyword"
                        placeholder="input search text"
                        class="ml-10 mr-10 w-200"
                    />
                    <a-button type="primary" @click="handlerSearch">搜索</a-button>
                    <a-button type="primary" @click="handlerSearch('reset')">重置</a-button>
                    <a-button>导出</a-button>
                </a-form-item>
            </a-form>
        </a-col>
        <a-col flex="100px"><a-button type="primary" block @click="data.visible = true">新增用户</a-button></a-col>
    </a-row>
    <a-table bordered :loading="data.loading_table" :dataSource="data.dataSource" :columns="data.columns" :row-selection="rowSelection" :pagination="false">
        <template #status="{text, record}">
            <a-switch :loading="record.loading" @change="handlerSwitch(record)" :checked="text == 1 ? true : false" />
        </template>
        <template #operation="{ record }">
            <div id="components-button-demo-basic">
            <a-button type="primary" @click="handlerEdit(record)">编辑</a-button>
            <a-button @click="deleteConfirm(record);">删除</a-button>
            <a-button type="danger">详情</a-button>
            </div>
        </template>
    </a-table>
    <a-row class="pt-30">
        <a-col :span="4"><a-button @click="deleteConfirm(null)" :disabled="data.delete_id.length === 0">批量删除</a-button></a-col>
        <a-col :span="20">
            <a-pagination class="float-right" show-quick-jumper v-model:current="data.current_page" :total="data.total" @change="handlerPage" />
        </a-col>
    </a-row>
    
    <ModalUser v-model:show="data.visible" v-model:row-id="data.row_id" @loadData="getUserList" />
</template>

<script>
import ModalUser from "@/components/Modal/User";
import { ref, reactive, onMounted, createVNode } from "vue";
// API
import { UserList, UserRemove, UserStatus } from "@/api/user";
// antd
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal, message } from 'ant-design-vue';
export default {
    name: "",
    components: { ModalUser },
    props: {},
    setup(props){
        const data = reactive({
            dataSource: [],
            columns: [
                {
                    title: '用户名',
                    dataIndex: 'username',
                    key: 'username',
                },
                {
                    title: '真实姓名',
                    dataIndex: 'truename',
                    key: 'truename',
                },
                {
                    title: '手机号',
                    dataIndex: 'phone',
                    key: 'phone',
                },
                {
                    title: '状态(禁/启用)',
                    dataIndex: 'status',
                    key: 'status',
                    slots: { customRender: 'status' },
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    slots: { customRender: 'operation' },
                },
            ],
            loading_table: false,
            visible: false,
            // 删除ID
            delete_id: [],
            // 记录用户ID
            row_id: 0,
            // 搜索项
            search: {},
            // 总计
            total: 0,
            // 页码
            page_number: 1,
            page_size: 10,
            current_page: 1,
        })
        const form_search_refs = ref(null);
        const form_search = reactive({
            status: "",
            role: "",
            key: "",
            keyword: ""
        })
        

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                if(selectedRows.length > 0) {
                    data.delete_id = selectedRows.map(item => item.member_id);
                }else{
                    data.delete_id = [];
                }
            },
            // onSelect: (record, selected, selectedRows) => {
            //     console.log(record, selected, selectedRows);
            // },
            // onSelectAll: (selected, selectedRows, changeRows) => {
            //     console.log(selected, selectedRows, changeRows);
            // }
        };

        const form = reactive({
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 14,
            },
        })
        const form_data = reactive({
            name: "",
            aaa: ""
        })

        const handlerEdit = (params) => {
            data.row_id = params.member_id;
            // 对话框显示
            data.visible = true;
        }
        // 搜索
        const handlerSearch = (type) => {
            if(type === "reset") { form_search_refs.value.resetFields(); }
            const search_data_copy = Object.assign({}, form_search);
            const search = {};
            if(search_data_copy.key && search_data_copy.keyword) {
                search[search_data_copy.key] = search_data_copy.keyword;
            }
            // 删除关键字
            delete search_data_copy.key;
            delete search_data_copy.keyword;
            // 拼接搜索项
            data.search = Object.assign({}, search, search_data_copy);
            // 过滤空选项
            for(let key in data.search) {
                if(data.search[key] === "") { delete data.search[key]; }
            }
            getUserList();
        }
        const getUserList = () => {
            data.loading_table = true;
            UserList({...data.search, pageSize: data.page_size, pageNumber: data.page_number}).then(response => {
                const response_data = response.content;
                data.dataSource = response_data.data;
                // 页码
                data.total = response_data.total;
                data.loading_table = false;
            }).catch(error => {
                data.loading_table = false;
            })
        }
        getUserList();

        // 加载完成
        onMounted(() => {
            console.log("111")
        })

        // switch
        const handlerSwitch = (data) => {
            const status = data.status == 1 ? false : true;
            data.status = status;
            data.loading = true;
            UserStatus({member_id: data.member_id, status}).then(response => {
                data.loading = false;
                message.success(response.msg);
            }).catch(error => {
                data.loading = false;
            })
        }
        // delete
        const deleteConfirm = (params) => {
            Modal.confirm({
                title: '温馨提示',
                icon: createVNode(ExclamationCircleOutlined),
                content: '确认删除此信息，删除后无法恢复？',
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    if(params) { data.delete_id = params.member_id; }
                    deleteApi();
                },
                onCancel() {},
            });
        }
        const deleteApi = () => {
            UserRemove({"member_id": data.delete_id}).then(response => {
                message.success(response.msg);
                getUserList();
            })
        }

        const handlerPage = (value) => {
            data.page_number = value;
            getUserList();
        }

        return {
            data,
            form,
            form_data,
            rowSelection,
            handlerEdit,
            deleteConfirm,
            handlerSwitch,
            getUserList,
            handlerSearch,
            handlerPage,
            form_search,
            form_search_refs
        }
   }
}
</script>
<style lang='scss' scoped>
</style>