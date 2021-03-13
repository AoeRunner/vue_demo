<template>
    <div class="sign-up">
        <h1>注册</h1>
        <v-text-field v-model="userName" label="用户名"></v-text-field>
        <v-text-field v-model="password" label="密码" type="password"></v-text-field>
        <v-text-field v-model="email" label="邮箱"></v-text-field>
        <v-btn color="primary" @click="register()">注册</v-btn>
        <v-btn color="primary" @click="signIn()" text>去登录</v-btn>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userName:'',
            password:'',
            email:''
        }
    },
    methods: {
        signIn(){
            this.$router.push({name:'SignIn'})
        },
        register(){
            console.log("德玛西亚万岁")
            let post_data = {
                userName : this.userName,
                password : this.password,
                email : this.email,
            }
            console.log("post_data:")
            console.log(post_data)
            console.log("开始注册")
            this.$api.user.signUp(post_data)
            .then((result) => {
                console.log(result)
                console.log(result.json)
            })
            .catch((err) => {
                console.log("err: "+err)
            });
        }
    }
}
</script>

<style scoped>
.sign-up{
    width: 600px;
    margin: 0 auto;
    text-align: center;
}
</style>