import axios from './http'

const cases ={
    getCaseList(params){
        console.log("请求数据/testCase/list")
        console.log(params)
        return axios.get('/testCase/list', {params})
    },
    createCaseByText(params){
        console.log("请求数据/testCase/text")
        console.log(params)
        return axios.post('/testCase/text', params)
    },
    createCaseByFile(params){
        return axios.post('/testCase/file', {
            methods: 'post',
            data: params,
            Header: {'Content-Type':'multipart/form-data',}
        })
    }
}
export default cases