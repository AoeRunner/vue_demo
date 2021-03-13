<template>
    <div>
        <template>
            <v-tabs :value="0" background-color="primary">
                <v-tab @click="$router.push({name:'Case'})">用例管理</v-tab>
                <v-tab @click="$router.push({name:'Task'})">任务管理</v-tab>
                <v-tab @click="$router.push({name:'Jenkins'})">jenins管理</v-tab>
                <v-tab @click="$router.push({name:'Report'})">报告管理</v-tab>
            </v-tabs>
        </template>
        <v-dialog v-model="addDialog" max-width="500px">
            <v-card>
                <v-card-title>添加测试用例</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field label="用例名称" v-model="addItem.caseName"></v-text-field>
                        <v-select :items="selectItem" label="用例类型" v-model="addItem.type"></v-select>
                        <v-textarea label="用例数据" v-model="addItem.caseData" v-if="addItem.type=='文本'"></v-textarea>
                        <v-file-input label="用例数据" v-model="addTtem.file" v-if="addItem.type=='文件'"></v-file-input>
                        <v-text-field label="备注" v-model="addItem.remark"></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="addCase()">确定</v-btn>
                    <v-btn color="primary" text @click="addDialog=false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-btn color="primary" class="btn" @click="addDialog=true">添加用例</v-btn>
        <v-btn color="success" class="btn">生成任务</v-btn>
        <template>
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1"
            >
            <template v-slot:[`item.operare`] = "{}">
                <v-btn color="primary" text small>编辑</v-btn>
                <v-btn color="error" text small>删除</v-btn>
            </template>
            </v-data-table>
        </template>
    </div>
</template>

<script>
export default {
    data(){
        return{
            addDialog:false,
            selectItem:["文本","文件"],
            addItem:{
                caseName:'',
                type:'',
                file:"",
                caseData:'',
                remark:''
            },
            selected:[],
            headers:[
                {
                    text:'id',
                    value:'id'
                },
                {
                    text:'用例名称',
                    value:'caseName'
                },
                {
                    text:'用例数据',
                    value:'caseData'
                },
                {
                    text:'操作',
                    value:'operare'
                },
            ],
            desserts:[]
        }
    },
    created(){
        let post_data={
            pageNum:1,
            pageSize:10
        }
        console.log("请求用例数据")
        console.log(post_data)
        this.$api.cases.getCaseList(post_data)
            .then((res) => {
                console.log("请求完成")
                console.log(res)
                this.desserts = res.data.data.data
            }).catch((err) => {
                console.log("请求报错")
                console.log(err)
            });
        },
    methods:{
        addCase(){
            if(this.addItem.type="文本"){
                console.log("待添加用例数据")
                console.log(this.addItem)
                let post_data={
                    caseName : this.addItem.caseName,
                    caseData : this.addItem.caseData,
                    remark : this.addItem.remark,
                }
                console.log(post_data)
                this.$api.cases.createCaseByText(post_data)
                .then(res=>{
                    console.log("加用例数据")
                    console.log(res)
                    this.addDialog = false
                })
            }else if(this.addItem.type="文本"){
                let post_data = new FormData()
                post_data.append('caseFile', this.addItem.file)
                post_data.append('caseData', this.addItem.data)
                post_data.append('caseName', this.addItem.caseName)
                this.$api.cases.createCaseByFile(post_data)
                .then(res=>{
                    console.log("加用例数据")
                    console.log(res)
                    this.addDialog = false
                })
            }
            
        }
    }
}
</script>

<style scoped>
.btn{
    margin: 10px;
}
</style>