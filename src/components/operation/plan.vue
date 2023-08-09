<template>
  <div class="user">
    <el-form :inline="true"
             style="margin-left:10px"
             :model="formInline"
             class="demo-form-inline">
      <el-form-item label="任务名称：">
        <el-input v-model="formInline.planName"
                  placeholder="请输入任务名称"
                  size="mini"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="search"
                   size="mini">查询</el-button>
        <el-button type="warning"
                   @click="reset"
                   size="mini">重置</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top:-10px;margin-left:10px">
      <el-button type="primary"
                 @click="create"
                 size="mini">新增</el-button>
      <el-button size="mini"
                 type="danger"
                 @click="handleDelete">删除</el-button>
    </div>
    <el-table ref="tableRef"
              :data="tableData"
              border
              class="tablecss"
              height="600"
              style="margin-top:10px"
              :cell-style="cellStyle"
              :row-key='row => row.id'
              :header-cell-style="headerCellStyle"
              @select="handleSelectionChange">
      <el-table-column type="selection"
                       width="45"
                       align="center" />
      <el-table-column prop="name"
                       label=" 任务名称"
                       align="center"
                       :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="模板数据"
                       align="center"
                       :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div @click="downLoad(scope.row)"
               style=" cursor: pointer;
     text-decoration: underline;">{{scope.row.fileName}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="image"
                       label="模板图片"
                       align="center">
        <template slot-scope="scope">

          <el-image :src="'data:image/png;base64,'+ scope.row.image"
                    v-viewer
                    class="image" />

        </template>
      </el-table-column>
      <el-table-column prop="isCommonlyUsed"
                       label="是否被使用"
                       align="center"
                       :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div v-if="scope.row.isCommonlyUsed == 0">否</div>
          <div v-else>是</div>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       fixed
                       align="center"
                       width="300">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     @click="handleEditFile(scope.$index, scope.row,'修改计划模板图片')">修改图片</el-button>
          <el-button size="mini"
                     @click="handleEditFile(scope.$index, scope.row,'修改计划模板文件')">修改文件</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationDiv">
      <el-pagination small
                     @current-change="handleCurrentChange"
                     :current-page="pageInfo.pageNum"
                     :page-size="pageInfo.pageSize"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     background>
      </el-pagination>

    </div>
    <el-dialog :title="dialogTitil"
               width="30%"
               :visible.sync="dialog"
               @close="close">
      <el-form label-width="100px"
               :model="formDate"
               :rules="rules"
               ref="form">
        <el-form-item label="任务名称"
                      prop="name">
          <el-input v-model="formDate.name"
                    placeholder="请输入用户名"
                    size="mini"></el-input>
        </el-form-item>
        <el-form-item label="模板图片"
                      v-if="dialogTitil == '新增计划'">
          <el-upload class="upload-demo"
                     :file-list="fileList"
                     :on-change="changFile"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :auto-upload="false">
            <el-button type="primary"
                       size="mini">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="模板文件"
                      v-if="dialogTitil == '新增计划'">
          <el-upload class="upload-demo"
                     :file-list="fileList1"
                     :on-change="changFile1"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :auto-upload="false">
            <el-button type="primary"
                       size="mini">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否被使用"
                      prop="isCommonlyUsed">
          <el-select v-model="formDate.isCommonlyUsed"
                     placeholder="请选择"
                     size="mini">
            <el-option label="是"
                       value="1"></el-option>
            <el-option label="否"
                       value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialog = false"
                   size="mini">取 消</el-button>
        <el-button type="primary"
                   @click="addUser"
                   size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="dialogTitil"
               width="30%"
               :visible.sync="dialogfile"
               @close="close1">
      <el-upload class="upload-demo"
                 :file-list="fileList"
                 :on-change="changFile"
                 action="https://jsonplaceholder.typicode.com/posts/"
                 :auto-upload="false">
        <el-button type="primary"
                   size="mini">点击上传</el-button>
      </el-upload>
      <!-- <el-upload
        style="margin-top:20px"
        class="upload-demo"
        :file-list="fileList1"
        :on-change="changFile1"
        action="https://jsonplaceholder.typicode.com/posts/"
        :auto-upload="false"
      >
        <el-button  type="primary" size="mini">点击上传模板文件</el-button>
      </el-upload>  -->

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogfile = false"
                   size="mini">取 消</el-button>
        <el-button type="primary"
                   @click="editFile"
                   size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'plan',
  data () {
    return {
      formInline: {
        planName: ''
      },
      fileList1: [],
      fileList: [],
      formDate: {
      },
      dialog: false,
      total: 0,
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
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
      selectData: [],
      dialogTitil: '',
      dialogfile: false,
      fileData: [],
      fileData1: [],
      rules: {
        name: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
        ],
        isCommonlyUsed: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
      },
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    create () {
      this.dialogTitil = '新增计划'
      this.dialog = true
    },
    addUser () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let url = this.dialogTitil == '新增计划' ? '/plan/addPlan' : '/plan/updatePlan'
          let type = this.dialogTitil == '新增计划' ? 'multipart/form-data' : 'application/json'
          let formData
          if (this.dialogTitil == '新增计划') {
            formData = new FormData();
            if (this.fileData.length) {
              formData.append('image', this.fileData[0].raw)
            }
            if (this.fileData1.length) {
              formData.append('data', this.fileData1[0].raw)
            }
            formData.append('name', this.formDate.name || '')
            formData.append('isCommonlyUsed', this.formDate.isCommonlyUsed || '')
          } else {
            formData = this.formDate
          }
          this.$http.post(baseUrl + url, formData, {
            headers: {
              'Content-Type': type,
              "token": window.sessionStorage.getItem("token")
            }
          }).then((res) => {
            if (res.data.code == 200) {
              this.getList()
              this.dialog = false
              this.$message.success(res.data.message);
            } else {
              this.$message.error(res.data.message);
            }

          })

        }
      })

    },
    editFile () {
      if (this.fileData.length == 0) {
        this.$message.warning('请上传文件')
        return
      }
      let type = this.dialogTitil == '修改计划模板图片' ? '1' : '2'
      let formData = new FormData();

      formData.append('file', this.fileData[0].raw)
      formData.append('type', type)
      formData.append('id', this.editData.id)
      formData.append('table', '计划')


      this.$http.post(baseUrl + '/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "token": window.sessionStorage.getItem("token")
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.getList()
          this.dialogfile = false
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }

      })
    },
    downLoad (e) {

      let url = baseUrl + '/file/download?id=' + e.id + '&table=计划&type=2'
      window.location.href = url

    },
    getList () {
      this.$http.post(baseUrl + '/plan/findPlan', { pageInfo: this.pageInfo, name: this.formInline.planName }, {
        headers: {
          "Token": window.sessionStorage.getItem("token")
        }
      }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.tableData = res.data.result
          this.total = res.data.result[0].pageInfo.totalCount || 0
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    handleEditFile (e, i, x) {
      console.log(e, i);
      this.editData = i
      this.dialogTitil = x
      this.dialogfile = true
    },
    handleEdit (index, e) {
      console.log(index, e);
      this.dialogTitil = '修改计划'
      this.formDate = e
      this.dialog = true
    },
    handleCurrentChange (page) {
      console.log(page);
      this.pageInfo.pageNum = page
      this.getList()
    },
    changFile (file, fileList) {
      console.log(fileList);
      const maxSize = 16 * 1024 * 1024;
      if (file.size > maxSize) {
        this.$message.warning('存在文件大小超过了16M');
        this.fileList = []
        return
      }
      this.fileData = fileList;
    },
    changFile1 (file, fileList) {
      console.log(fileList);
      const maxSize = 16 * 1024 * 1024;
      if (file.size > maxSize) {
        this.$message.warning('存在文件大小超过了16M');
        this.fileList1 = []
        return
      }
      this.fileData1 = fileList;
    },
    handleSelectionChange (row) {
      console.log(row);
      this.selectData = row
    },
    close () {
      this.formDate = {}
      this.fileList = []
      this.fileList1 = []
      this.$refs.form.clearValidate();
      this.fileData = []
    },
    close1 () {
      this.fileData = []
      this.fileList = []
    },
    handleDelete () {
      if (this.selectData.length == 0) {
        this.$message.warning('请勾选需要删除的数据')
        return
      }
      let arrid = []
      this.selectData.forEach((res) => {
        arrid.push({ id: res.id })
      })
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        size: 'mini',
      }).then(() => {
        this.$http.post(baseUrl + "/plan/delPlan", arrid, {
          headers: {
            'Content-Type': 'application/json',
            "token": window.sessionStorage.getItem("token")
          }
        }).then((res) => {
          if (res.data.code == 200) {
            this.getList()
            this.$message.success(res.data.message);
          } else {
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
    search () {
      this.getList()
    },
    reset () {
      this.formInline.planName = ''
      this.pageInfo.pageNum = 1
      this.getList()
    },
  }
}
</script>
<style lang="less" scoped>
.paginationDiv {
  font-size: 16px !important;
  text-align: center;
}
.image {
  width: 23px;
  height: 23px;
}
/deep/ .el-table--border::after {
  background-color: transparent !important;
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

.paginationDiv /deep/ .el-pagination__total {
  color: white;
}
.paginationDiv /deep/ .el-pagination__jump {
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