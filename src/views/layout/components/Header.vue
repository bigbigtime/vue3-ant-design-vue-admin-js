<template>
    <div id="header">
        <div class="collapsed-button" @click="colapsedButton">
            <svg-icon iconName="collapsed" class="collapsed-svg" />
        </div>
        <div class="header-menu">
            <a-dropdown>
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                    <img src="../../../assets/images/face.png" />
                </a>
                <template #overlay>
                <a-menu>
                    <a-menu-item key="0">
                        <div class="menu-item">
                            <svg-icon iconName="user1" className="header-menu-svg"></svg-icon>13713746864
                        </div>
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="1">
                        <div class="menu-item menu-lang">
                            <svg-icon iconName="lang" className="header-menu-svg"></svg-icon>
                            <span 
                                v-for="item in data.lang" 
                                :key="item.value" 
                                @click="toggleLang(item.value)"
                                :class="{'current': data.lang_current == item.value}"
                            >
                            {{ item.label }}</span> 
                        </div>
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="3">
                        <div class="menu-item">
                            <svg-icon iconName="exit" className="header-menu-svg"></svg-icon>{{ $t("header_menu.logout") }}
                        </div>
                    </a-menu-item>
                </a-menu>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>
<script>
import { reactive, getCurrentInstance } from 'vue'
// 语言
import { useI18n } from 'vue-i18n';
export default {
    name: "Aside",
    setup(){
        const { emit } = getCurrentInstance();


        
        // 扩展语言
        const { locale } = useI18n({ useScope: 'global' });
        const data = reactive({
            lang: [
                { label: "中文", value: "ch" },
                { label: "En", value: "en" },
                { label: "日文", value: "jp" },
            ],
            lang_current: "ch"
        });
        // 设置语言
        const toggleLang = (lang) => {
            locale.value = lang;
            data.lang_current = lang;
        }

        const colapsedButton = () => {
            emit("colapsed")
        }

        return {
            data,
            toggleLang,
            colapsedButton
        }
    }
}
</script>
<style lang="scss" scoped>
#header {
    padding: 0 20px;
    height: 64px;
}
.header-menu {
    float: right;
    margin-top: 15px;
}
.menu-item {
    padding: 0 10px;
    font-size: 14px;
    font-family: "黑体";
    color: #333333;
}
.menu-lang { 
    color: #aeaeae;
    span { margin-right: 10px; }
    .current { color: #333333; }
}
.collapsed-button {
    float: left;
    cursor: pointer;
    font-size: 20px;
}
</style>