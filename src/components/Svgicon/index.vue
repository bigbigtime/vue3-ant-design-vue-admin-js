<template>
    <svg class="svg-class" :class="className">
        <use :href="'#icon-' + iconName"></use>
    </svg>
</template>
<script>
export default {
    name: "SvgIcon",
    props: {
        iconName: {
            type: String,
            default: ""
        },
        className: {
            type: String,
            default: ""
        }
    },
    setup(){
        // 获取当前svg目录所有为.svg结尾的文件
        const req = require.context('../../assets/svg', false, /\.svg$/);
        // 解析获取的.svg文件的文件名称，并返回
        const requireAll = (requireContext) => {
             return requireContext.keys().map(requireContext);  
        };
        requireAll(req);
    }
}
</script>