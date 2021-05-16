<template>
    <a-table :dataSource="data.dataSource" :scroll="{ y: 240 }" :columns="data.columns" :row-selection="rowSelection">
        <template #status="{ text }">
            <a-switch v-model:checked="checked" />
        </template>
        <template #operation>
            <div id="components-button-demo-basic">
            <a-button type="primary">编辑</a-button>
            <a-button>删除</a-button>
            <a-button type="danger">详情</a-button>
            </div>
        </template>
    </a-table>
</template>

<script>
import { reactive } from "vue";
export default {
   name: "",
   components: {},
   props: {},
   setup(props){
        const data = reactive({
            dataSource: [
                {
                    key: '1',
                    name: '胡彦斌',
                    age: 32,
                    address: '西湖区湖底公园1号',
                    status: true
                },
                {
                    key: '2',
                    name: '胡彦祖',
                    age: 42,
                    address: '西湖区湖底公园1号',
                    status: false
                }
            ],

            columns: [
                {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '年龄',
                    dataIndex: 'age',
                    key: 'age',
                },
                {
                    title: '住址',
                    dataIndex: 'address',
                    key: 'address',
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

       return {
           data,
           rowSelection
       }
   }
}
</script>
<style lang='scss' scoped>
</style>