<template>
    <div class="login-form">
        <h1>登录</h1>
        <v-text-field v-model="userName" label="用户名"></v-text-field>
        <v-text-field v-model="password" label="密码" type="password"></v-text-field>
        <v-btn color="primary" @click="login()">登录</v-btn>
        <v-btn color="primary" text @click="signUp()">注册</v-btn>
    </div>
</template>

<script>
export default {
    data(){
            return{
                userName:'',
                password:''
            }
        },
    methods:{
        signUp(){
            console.log('123')
            this.$router.push({name:'SignUp'})
        },
        login(){
            console.log("登录")
            let post_data = {
                userName: this.userName,
                password: this.password
            }
            console.log(post_data)
            this.$api.user.signIn(post_data)
            .then((result) => {
                console.log(result)
                console.log(result.json)
                console.log('token')
                console.log(result.data.data.token)
                console.log("存储token")
                localStorage.setItem('token',result.data.data.token)
                console.log("获取token")
                console.log(localStorage.getItem['token'])
                console.log("无敌剑圣")
                localStorage.setItem('userName', this.userName)
                this.$router.push({name:'Case'})
            }).catch((err) => {
                console.log(err)
            });
        }
    },
}
</script>

<style scoped>
.login-form{
    width: 600px;
    margin: 0 auto;
    text-align: center;
}
</style>