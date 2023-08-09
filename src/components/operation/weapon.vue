<template>
  <div class="user">
    <el-form :inline="true"
             style="margin-left:10px"
             :model="formInline"
             class="demo-form-inline">
      <el-form-item label="编号：">
        <el-input v-model="formInline.number"
                  placeholder="请输入编号"
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
      <el-table-column prop="number"
                       label="编号"
                       align="center"
                       :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="description"
                       label="描述"
                       align="center"
                       :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="图片"
                       align="center">
        <template slot-scope="scope">

          <el-image :src="'data:image/png;base64,'+ scope.row.pic"
                    v-viewer
                    class="image" />

        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       fixed
                       :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     @click="handleEditFile(scope.$index, scope.row)">修改图片</el-button>
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
      <el-form label-width="80px"
               :model="formDate"
               :rules="rules"
               ref="form">
        <el-form-item label="编号"
                      prop="number">
          <el-input v-model="formDate.number"
                    placeholder="请输入编号"
                    size="mini"></el-input>
        </el-form-item>
        <el-form-item label="模板图片"
                      v-if="dialogTitil =='新增武器'">
          <el-upload class="upload-demo"
                     :file-list="fileList"
                     :on-change="changFile"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :auto-upload="false">
            <el-button type="primary"
                       size="mini">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述"
                      prop="description">
          <el-input v-model="formDate.description"
                    placeholder="请输入描述"
                    size="mini"></el-input>
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
  name: 'weapon',
  data () {
    return {
      formInline: {
        number: '',
      },
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
        { name: 112, description: '1234', pic: '../../../static/image/启动界面背景.png' }
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
      fileData: [],
      dialogfile: false,
      editData: {},
      dialogTitil: '',
      rules: {
        number: [
          { required: true, message: "请输入编号", trigger: "blur" },
        ],
        description: [
          { required: true, message: "请输入编号", trigger: "blur" },
        ],
      },
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    create () {
      this.dialogTitil = '新增武器'
      this.dialog = true
    },
    handleEditFile (e, i) {
      console.log(e, i);
      this.editData = i
      this.dialogTitil = '修改武器模板图片'
      this.dialogfile = true
    },
    addUser () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formDate['type'] = '1'
          let url = this.dialogTitil == '新增武器' ? '/weapon/addWeapon' : '/weapon/updateWeapon'
          let type = this.dialogTitil == '新增武器' ? 'multipart/form-data' : 'application/json'
          let formData
          if (this.dialogTitil == '新增武器') {
            formData = new FormData();
            if (this.fileData.length) {
              formData.append('image', this.fileData[0].raw)
            }
            formData.append('type', this.formDate.type)
            formData.append('number', this.formDate.number || '')
            formData.append('description', this.formDate.description || '')
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
      //let type = this.dialogTitil == '修改强敌模板图片'?'1':'2'
      let formData = new FormData();

      formData.append('file', this.fileData[0].raw)
      formData.append('type', '1')
      formData.append('id', this.editData.id)
      formData.append('table', '武器')


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
    getList () {
      this.$http.post(baseUrl + '/weapon/findWeapon', { pageInfo: this.pageInfo, type: '1', number: this.formInline.number }, {
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
    handleEdit (index, e) {
      console.log(index, e);
      this.dialogTitil = '修改武器'
      this.formDate = e
      this.dialog = true
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
    handleCurrentChange (page) {
      console.log(page);
      this.pageInfo.pageNum = page
      this.getList()
    },
    handleSelectionChange (row) {
      console.log(row);
      this.selectData = row
    },
    close () {
      this.formDate = {}
      this.fileData = []
      this.fileList = []
      this.$refs.form.clearValidate();
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
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        size: 'mini',
      }).then(() => {
        this.$http.post(baseUrl + "/weapon/delWeaponByBath", this.selectData, {
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
      this.formInline.number = ''
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