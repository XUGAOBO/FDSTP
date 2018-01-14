<template>
    <div class="welcome">
        <img src="../../assets/images/bg.png" />
        <footer>
            <div class="welcome-period">{{content.content}}</div>
            <div class="welcome-support">
                <div>
                    <img src="../../assets/images/code.jpg" />
                </div>
                <div>
                    <h3>系统技术支持</h3>
                    <div v-if="content.phone"><span>联系电话: </span> {{content.phone}}</div>
                    <div v-if="content.qq"><span>QQ: </span> {{content.qq}}</div>
                    <div v-if="content.email"><span>email: </span> {{content.email}}</div>
                    <div v-if="content.wechat"><span>微信: </span> {{content.wechat}}</div>
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
    import {
        systemSupport
    } from '../../api/user'
    export default {
        data() {
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
