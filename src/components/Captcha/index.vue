<template>
    <div class="captcha-wrap">
        <div id="captcha-dom" class="nc-container"></div>
    </div>
</template>
<script>
import { onMounted } from "vue";
import "./captcha";
export default {
    name: "Captcha",
    setup(){
        onMounted(() => {
            var nc_token = ["FFFF0N00000000009931", (new Date()).getTime(), Math.random()].join(':');  // 没有做任何的响应
            var NC_Opt = 
            {
                renderTo: "#captcha-dom",
                appkey: "FFFF0N00000000009931",
                scene: "nc_login",
                token: nc_token,
                customWidth: 300,
                trans:{"key1":"code0"},
                elementID: ["usernameID"],
                is_Opt: 0,
                language: "cn",
                isEnabled: true,
                timeout: 3000,
                times:5,
                apimap: {
                    // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
                    // 'get_captcha': '//b.com/get_captcha/ver3',
                    // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
                    // 'get_img': '//c.com/get_img',
                    // 'checkcode': '//d.com/captcha/checkcode.jsonp',
                    // 'umid_Url': '//e.com/security/umscript/3.2.1/um.js',
                    // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
                    // 'umid_serUrl': 'https://g.com/service/um.json'
                },   
                callback: function (data) { 
                    window.console && console.log(nc_token)
                    window.console && console.log(data.csessionid)
                    window.console && console.log(data.sig)
                }
            }
            var nc = new noCaptcha(NC_Opt)
            nc.upLang('cn', {
                _startTEXT: "请按住滑块，拖动到最右边",
                _yesTEXT: "验证通过",
                _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
                _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
            })
        })
    }
}
</script>
<style lang="scss">
.captcha-wrap {
    .nc-container #nc_1_wrapper { width: auto !important; }
    .nc-container .nc_scale span { height: auto; }
    .nc-container .nc_scale .btn_ok { line-height: 32px; }
}
</style>
<!-- scoped 
局部的样式应用：当前文件应用
避免样式全局污染。
-->