<template>
    <a-row type="flex" class="mb-20">
        <a-col flex="auto">
            <a-form layout="inline">
                <a-form-item label="角色类型">
                    <a-select style="width: 120px" ref="select">
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                        <a-select-option value="disabled">Disabled</a-select-option>
                        <a-select-option value="Yiminghe">yiminghe</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="状态">
                    <a-select style="width: 120px" ref="select">
                        <a-select-option value="jack">禁用</a-select-option>
                        <a-select-option value="lucy">启用</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="关键字">
                    <a-select style="width: 120px" ref="select">
                        <a-select-option value="jack">用户名</a-select-option>
                        <a-select-option value="lucy">真实姓名</a-select-option>
                        <a-select-option value="lucy">手机号</a-select-option>
                    </a-select>
                    <a-input-search
                        placeholder="input search text"
                        class="ml-10 mr-10 w-200"
                    />
                    <a-button type="primary">搜索</a-button>
                    <a-button type="primary">重置</a-button>
                    <a-button>导出</a-button>
                </a-form-item>
            </a-form>
        </a-col>
        <a-col flex="100px"><a-button type="primary" block @click="data.visible = true">新增用户</a-button></a-col>
    </a-row>
    <a-table bordered :dataSource="data.dataSource" :scroll="{ y: 240 }" :columns="data.columns" :row-selection="rowSelection">
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
    <ModalUser v-model:show="data.visible" v-model:row-id="data.row_id" />
</template>

<script>
import ModalUser from "@/components/Modal/User";
import { reactive, onMounted, createVNode } from "vue";
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
            visible: false,
            row_id: 0
       })

       

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            }
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

        const getUserList = () => {
            UserList({pageSize: 10, pageNumber:1}).then(response => {
                const response_data = response.content;
                data.dataSource = response_data.data;
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
        const deleteConfirm = (data) => {
            Modal.confirm({
                title: '温馨提示',
                icon: createVNode(ExclamationCircleOutlined),
                content: '确认删除此信息，删除后无法恢复？',
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    deleteApi(data);
                },
                onCancel() {},
            });
        }
        const deleteApi = (data) => {
            UserRemove({"member_id": data.member_id}).then(response => {
                message.success(response.msg);
                getUserList();
            })
        }

        return {
            data,
            form,
            form_data,
            rowSelection,
            handlerEdit,
            deleteConfirm,
            handlerSwitch
        }
   }
}
</script>
<style lang='scss' scoped>
</style>