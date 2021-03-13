import axios from 'axios'
var instance = axios.create({
    headers: {
        'Content-Type':'application/json',
        // 'token':'ab945fee4636de5e83ab1dc5de6b8791'
    },
    baseURL: 'http://stuq.ceshiren.com:8089/'
})
instance.interceptors.request.use(config=>{
    if(localStorage.getItem('token')){
        console.log("获取到token")
        console.log(localStorage.getItem['token'])
        config.headers.common['token'] = localStorage.getItem['token']
    }
    return config
})

export default instance