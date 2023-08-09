<template>
  <div class="user">
       <el-form :inline="true" style="margin-left:10px" :model="formInline" class="demo-form-inline">
  <el-form-item label="用户名：">
    <el-input v-model="formInline.user" placeholder="请输入用户名" size="mini"></el-input>
  </el-form-item>
  <el-form-item label="所属阵营：">
    <el-select v-model="formInline.region" placeholder="请选择阵营" clearable size="mini">
      <el-option label="红" value="0"></el-option>
      <el-option label="蓝" value="1"></el-option>
      <el-option label="观察者" value="2"></el-option>
      <el-option label="其他" value="3"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="search" size="mini">查询</el-button>
    <el-button type="warning" @click="reset" size="mini">重置</el-button>
  </el-form-item>
</el-form>
<div style="margin-top:-10px;margin-left:10px"> 
    <el-button type="primary" @click="create" size="mini">新增</el-button>
    <el-button
          size="mini"
          type="danger"
          @click="handleDelete">删除</el-button></div>
                     <el-table
          ref="tableRef"
          :data="tableData"
          border
          class="tablecss"
         height="600"
         style="margin-top:10px"
          :cell-style="cellStyle"
          :row-key='row => row.id'
          :header-cell-style="headerCellStyle"
          @select="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="45"
            align="center"
          />
          <el-table-column prop="loginName" label=" 用户名"  align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <!-- <el-table-column prop="superId" label="上级ID"  align="center" :show-overflow-tooltip="true">
          </el-table-column> -->
          <!-- <el-table-column prop="levelId" label="军衔ID"  align="center" :show-overflow-tooltip="true">
          </el-table-column> -->
          <el-table-column prop="userRole" label="角色系统权限"  align="center" :show-overflow-tooltip="true">
               <template slot-scope="scope">
                 <div>{{roleShow(scope.row.userRole)}}</div>
           
        </template>
          </el-table-column>
          <el-table-column prop="pic" label="军衔图标"  align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  
  <el-image :src="'data:image/png;base64,'+ scope.row.pic" v-viewer class="image" />
                </template>
                          </el-table-column>
          <el-table-column prop="name" label="军衔名称"  align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  label="所属阵营" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">
            <div v-if="scope.row.comp == 0">红色</div>
            <div v-else-if="scope.row.comp == 1">蓝色</div>
            <div v-else-if="scope.row.comp == 3">观察者</div>
            <div v-else>其他</div>
        </template>
          </el-table-column>
           <el-table-column label="操作" align="center" :show-overflow-tooltip="true">
      <template slot-scope="scope" fixed>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        
      </template>
           </el-table-column>
                     </el-table>
                     <div class="paginationDiv">
                     <el-pagination
                     small
      
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageNum"
      :page-size="pageInfo.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      background
    >
    </el-pagination>
    
    </div>
    <el-dialog :title="dialogTitil" width="30%" :visible.sync="dialog" @close="close">
  <el-form  label-width="80px" :model="formDate" :rules="rules" ref="form">
  <el-form-item label="用户名" prop="loginName">
    <el-input v-model="formDate.loginName" placeholder="请输入用户名" size="mini"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password" v-if="dialogTitil == '新增用户'">
    <el-input v-model="formDate.password" placeholder="请输入密码" size="mini"></el-input>
  </el-form-item>
  <el-form-item label="密码" v-else>
    <el-input v-model="formDate.password" placeholder="请输入密码" size="mini"></el-input>
  </el-form-item>
  <el-form-item label="上级ID" prop="superId">
     <el-select v-model="formDate.superId" placeholder="请选择" size="mini">
     <el-option
      v-for="item in superOption"
      :key="item.id"
      :label="item.loginName"
      :value="item.id">
    </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="军衔ID" prop="levelId">
    <el-select v-model="formDate.levelId" placeholder="请选择" size="mini">
     <el-option
      v-for="item in levelOption"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="权限" prop="userRole">
      <el-select v-model="formDate.userRole" multiple placeholder="请选择权限" size="mini">
      <el-option
      v-for="item in userRoleOption"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
  </el-form-item>
  <!-- <el-form-item label="军衔图标" prop="pic">
    <el-input v-model="formDate.pic" size="mini"></el-input>
  </el-form-item>
  <el-form-item label="军衔名称" prop="name">
    <el-input v-model="formDate.name" size="mini"></el-input>
  </el-form-item> -->
  <el-form-item label="所属阵营" prop="comp">
       <el-select v-model="formDate.comp" placeholder="请选择所属阵营" size="mini">
      <el-option label="红" value="0"></el-option>
      <el-option label="蓝" value="1"></el-option>
      <el-option label="观察者" value="2"></el-option>
      <el-option label="其他" value="3"></el-option>
    </el-select>
  </el-form-item>
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="addUser" size="mini">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
        formInline: {
          user: '',
          region: ''
        },
        formDate:{     
            loginName:'',
            password:'',
            superId:'',
            levelId:'',
            userRole:'',
           // pic:'',
            //name:'',
            comp:''
        },
        dialog:false,
        total:0,
        pageInfo:{
            pageSize:10,
        pageNum:1,
        },
         tableData: [
      ],
      cellStyle: {
        background: "transparent", //这个是取消鼠标滑过显示颜色看自己需求
        borderColor: "#205978",
      },
      headerCellStyle: {
        background: "rgba(24, 102, 143, 0.3)", //表头背景色设置
        borderColor: "#205978",
      },
      selectData:[],
      dialogTitil:'',
      editData:{},
      superOption:[],
      levelOption:[],
      userRoleOption:[
        {label:'想定管理',value:1},
        {label:'组训管理',value:2},
        {label:'导调控制',value:4},
        {label:'指挥作业',value:8},
        {label:'态势演示',value:16},
        {label:'行动仿真',value:32},
        {label:'系统管理',value:64},
      ],
      optionValue:[1,2,4,8,16,32,64],
      rules: {
        loginName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        superId: [{ required: true, message: "请输入上级ID", trigger: "blur" }],
        levelId: [{ required: true, message: "请输入军衔ID", trigger: "blur" }],
        userRole: [{ required: true, message: "请输入用户权限", trigger: "blur" }],
       // pic: [{ required: true, message: "请输入军衔图标", trigger: "blur" }],
       // name: [{ required: true, message: "请输入军衔名称", trigger: "blur" }],
        comp: [{ required: true, message: "请输入所属阵营", trigger: "blur" }],
      },
    }
  },
  mounted(){
      this.getList()
  },
  methods:{
      create(){
          this.dialogTitil = '新增用户'
          this.dialog = true
      },
      roleShow(i){
          let arr = []
          i.forEach((res)=>{
             this.userRoleOption.forEach((e)=>{
            if(res == e.value) {
              arr.push(e.label)
            }
             })
          })
          return arr.join()
        
      },
      roleSet(arr,con){
        let result = [], i = 0, len = arr.length;
        for(; i< len; i++) {
            let v = arr[i], j = 0, rLen = result.length;
            result.push({vl: v, ar: [v]});
            if(rLen) {
                for(; j< rLen; j++) {
                    result.push({vl: v+result[j].vl, ar: result[j].ar.concat(v)});
                }
            }
        }
        if(i === len) {
            return result.filter(x => x.vl == con);
        }
      },
      addUser(){
            this.$refs.form.validate((valid) => {
        if (valid) {
            let url = this.dialogTitil == '新增用户'?'/data/addUser':'/data/updateUser'
            let role = 0
            this.formDate.userRole.forEach((i)=>{
              role  = role + i
            })
          let data = {}
          if(this.dialogTitil == '新增用户'){
            data = {
              comp:this.formDate.comp,
              levelId:this.formDate.levelId,
              loginName:this.formDate.loginName,
              password:this.formDate.password,
              superId:this.formDate.superId,
              userRole:role
            }
          }else{
            data = {
              comp:this.formDate.comp,
              levelId:this.formDate.levelId,
              loginName:this.formDate.loginName,
              password:this.formDate.password,
              superId:this.formDate.superId,
              userRole:role,
              id:this.formDate.id
            }
          }
            this.$http.post(baseUrl + url,JSON.stringify(data),{
        headers: {
         'Content-Type': 'application/json',
          "token":  window.sessionStorage.getItem("token")
        }
      }).then((res)=>{
        if(res.data.code == 200){
            this.getList()
            this.dialog = false
           this.$message.success(res.data.message); 
        }else{
         this.$message.error(res.data.message); 
        }
       
      })

        }})
          
      },
      handleEditFile(e,i,x){
          console.log(e,i);
          this.editData = i
          this.dialogTitil = x
          this.dialogfile = true
      },
      getList(){
          this.$http.post(baseUrl+ '/data/findUser',{pageInfo:this.pageInfo,loginName:this.formInline.user,comp:this.formInline.region},{
        headers: {
          "Token": window.sessionStorage.getItem("token")
        }}).then((res)=>{
              if(res.data.code === 200){
                  this.tableData = res.data.result
                 
                  res.data.result.forEach((r,index)=>{
                    let role = this.roleSet(this.optionValue,r.userRole)
                  this.tableData[index].userRole = role[0].ar
                  })
                 this.total = res.data.result[0].pageInfo.totalCount || 0
              }else{
                  this.$message.error(res.msg); 
              }
     })
     this.$http.get(baseUrl+ '/data/selectSuperIdList',{
        headers: {
          "Token": window.sessionStorage.getItem("token")
        }}).then((res)=>{
              if(res.data.code === 200){
                  this.superOption = res.data.result
              }else{
                  this.$message.error(res.msg); 
              }
     })
     this.$http.get(baseUrl+ '/data/selectLevelIdList',{
        headers: {
          "Token": window.sessionStorage.getItem("token")
        }}).then((res)=>{
              if(res.data.code === 200){
                  this.levelOption = res.data.result
              }else{
                  this.$message.error(res.msg); 
              }
     })
      },
      handleEdit(index,e){
        e.levelId = e.levelId*1
          console.log(index,e);
          this.dialogTitil = '修改用户'
          this.formDate = e
          this.dialog = true
      },
      handleCurrentChange(page){
          console.log(page);
          this.pageInfo.pageNum = page
          this.getList()
      },
      handleSelectionChange(row){
          console.log(row); 
          this.selectData = row
      },
      close(){
          this.formDate = {}
          this.$refs.form.clearValidate();
      },
      handleDelete(){
          if(this.selectData.length == 0){
              this.$message.warning('请勾选需要删除的数据')
              return
          }
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          size:'mini',
        }).then(() => {
              this.$http.post(baseUrl + "/data/delUserByBath",this.selectData,{
        headers: {
         'Content-Type': 'application/json',
          "token": window.sessionStorage.getItem("token")
        }
      }).then((res)=>{
        if(res.data.code == 200){
            this.getList()
            this.$message.success(res.data.message);
        }else{
          this.$message.error(res.data.message);
        }
       
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      search(){
         this.getList()
      },
      reset(){
          this.formInline.user = ''
          this.formInline.region = ''
          this.pageInfo.pageNum = 1
          this.getList()
      },
  }
}
</script>
<style lang="less" scoped>
.paginationDiv{
    font-size: 16px !important;
   text-align: center;
}
.image {
    width: 23px;
    height: 23px;
}
/deep/ .el-table--border::after {
    background-color:transparent !important
}
/* .paginationDiv >>> .el-pagination.is-background .el-pager li{
    background-color: rgba(67, 97, 120, 0.5) !important;
    color: #fff;
}
.paginationDiv >>> .el-pagination.is-background .btn-prev{
    background-color: rgba(67, 97, 120, 0.5) !important;
}
.paginationDiv >>> .el-pagination.is-background .btn-next{
    background-color: rgba(67, 97, 120, 0.5) !important;
} */

.paginationDiv /deep/ .el-pagination__total{
  color: white;
}
.paginationDiv /deep/ .el-pagination__jump  {
  color: white;
}
::-webkit-scrollbar {
width: 1px;
height: 1px;
}
/* // 滚动条的滑块 */
::-webkit-scrollbar-thumb {
background-color: #a1a3a9;
border-radius: 0px;
}
</style>