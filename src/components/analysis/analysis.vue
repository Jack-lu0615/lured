<template>
  <div class='myHomes'>
    <div class='getMyanalysis'>
      <div class='head'>
        <div>分析评估系统</div>
      </div>
      <div class='user_skills'>
        <el-table
          ref='tableRef'
          :data='tableData'
          border
          class='tablecss'
          :cell-style='cellStyle'
          :header-cell-style='headerCellStyle'
          @select='handleSelectionChange'
          @row-click="handleSelectionChange('', $event)"
        >
          <el-table-column type='selection' width='45' align='center' />
          <el-table-column prop='date' label='日期' align='center'>
          </el-table-column>
          <el-table-column prop='name' label='姓名' align='center'>
          </el-table-column>
          <el-table-column prop='address' label='地址' align='center'>
          </el-table-column>
          <el-table-column label='操作' align='center'>
            <template slot-scope='scope'>
              <el-button
                size='mini'
                @click='handleEdit(scope.$index, scope.row)'
                >编辑</el-button
              >
              <el-button
                size='mini'
                type='danger'
                @click='handleDelete(scope.$index, scope.row)'
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class='bottomlogo'>
      <img src='../../../static/image/公司标志-02.png' alt='' />
      <span>北京国遥新天地信息技术股份有限公司</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'analysis',
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      cellStyle: {
        background: 'transparent', // 这个是取消鼠标滑过显示颜色看自己需求
        borderColor: '#205978'
      },
      headerCellStyle: {
        background: 'rgba(24, 102, 143, 0.3)', // 表头背景色设置
        borderColor: '#205978'
      },
      selections: ''
    }
  },
  mounted () {},
  methods: {
    handleSelectionChange (selection, row) {
      this.$refs.tableRef.clearSelection() // 这里因为需求做的是必选一个，如有其他需求可做调整
      this.$refs.tableRef.toggleRowSelection(row, true)
      this.selections = row
      this.$router.push({
        name: 'analysisDetails',
        query: { id: 1 }
      })
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style  lang='less' scoped>
.myHomes {
  width: 100%;
  height: 100%;
  background-image: url('../../../static/image/启动界面背景.png');
  background-size: cover;
  background-repeat: no-repeat;
  /* text-align: center; */
}
.myHomes .head {
  background: rgba(67, 97, 120, 0.5);
  width: 100%;
  height: 50px;
}
.myHomes .head div {
  color: #fff;
  height: 50px;
  line-height: 50px;
  font-size: 21px;
  margin-left: 20px;
}

.user_skills {
  margin: 20px;
}
.user_skills {
  /deep/ .tablecss {
    .el-table__header-wrapper {
      .el-checkbox__inner {
        display: none !important;
      }
    }
  }
}
.tablecss {
  /* 修改复选框样式 变成单选框样式 */
  /deep/ .el-checkbox__inner {
    border: 1px solid #dcdfe6;
    border-radius: 100%;
    width: 14px;
    height: 14px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    &::after {
      transform: translate(-50%, -50%) scale(1);
      width: 3px;
      height: 3px;
      border-radius: 100%;
      background-color: #fff;
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transition: transform 0.15s ease-in;
    }
  }
}
.user_skills .el-table {
  border-color: #205978;
  color: whitesmoke;
  border-radius: 5px;
}
/deep/ .el-table,
/deep/ .el-table__expanded-cell {
  background-color: transparent;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent;
}
.el-table::before {
  //去除底部白线
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

.myHomes .bottomlogo {
  position: absolute;
  bottom: 10px;
  color: #fff;
  text-align: center;
  width: 100%;
}
.myHomes .bottomlogo img {
  width: 60px;
  height: 25px;
  vertical-align: middle;
  margin-right: 12px;
}
.myHomes .bottomlogo span {
  vertical-align: middle;
  line-height: 25px;
  font-size: 20px;
  font-family: 'Microsoft YaHei';
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
