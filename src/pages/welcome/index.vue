<template>
    <div class="welcome">
        <img src="../../assets/images/bg.png" />
        <footer>
            <div>{{content.content}}</div>
            <div class="welcome-support">
                <h3>系统技术支持</h3>
                <div><span>联系电话: </span> {{content.phone}}</div>
                <div><span>QQ: </span> {{content.qq}}</div>
                <div><span>email: </span> {{content.email}}</div>
                <div><span>微信: </span> {{content.wechat}}</div>
            </div>
        </footer>
    </div>
</template>
<script>
    import {
        systemSupport
    } from '../../api/user'
    export default {
        data () {
            return {
                content: {}      
            }
        },
        mounted() {
            systemSupport()
                .then(res => {
                    this.content = res;
                })
        }
    }
</script>
