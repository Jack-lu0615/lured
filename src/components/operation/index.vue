<template>
  <div class="myHomes">
    <div class="getMyanalysis">
      <div class="head">
        <div style="margin-left:20px">数据维营分系统</div>
        <div style="margin-right:20px"><el-button type="text"
                     @click="logoutCount">
            退出账户</el-button></div>
      </div>
      <div class="body">
        <div class="body_left">
          <div class="left_top">
            <div class="top_head">
              <div>导航</div>
            </div>
            <div class="top_body">
              <el-menu default-active="1"
                       class="el-menu-vertical-demo menucss"
                       @select="handleSelect"
                       background-color="transparent"
                       text-color="#fff"
                       active-text-color="#ffd04b">
                <el-menu-item index="1">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">用户</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">特情</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-document"></i>
                  <span slot="title">计划</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">武器</span>
                </el-menu-item>
                <el-menu-item index="5">
                  <i class="el-icon-setting"></i>
                  <span slot="title">强敌</span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </div>
        <div class="body_right">
          <div class="top_head">
            <div>{{this.menuTitil }}</div>
          </div>
          <div class="right_body">
            <user v-if="menuIndex == 1" />
            <special v-if="menuIndex == 2" />
            <plan v-if="menuIndex == 3" />
            <formidable v-if="menuIndex == 5" />
            <weapon v-if="menuIndex == 4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user from './user.vue';
import special from './special.vue';
import plan from './plan.vue';
import weapon from './weapon.vue';
import formidable from './formidable.vue';
export default {
  name: "operation",
  components: { user, special, plan, weapon, formidable },
  data () {
    return {
      menuIndex: 1,
      menuTitil: '用户',

    };
  },
  mounted () {
    window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
    window.addEventListener("unload", (e) => this.unloadHandler(e));
  },
  methods: {
    beforeunloadHandler (e) {
      if (window.sessionStorage.getItem("userRole") !== 3) {
        if (e) {
          e = e || window.event;
          console.log(e);
          if (e) {
            e.returnValue = "关闭提示";
          }
          return "关闭提示";
        }
      }
    },
    async unloadHandler (e) {
      if (window.sessionStorage.getItem("userRole") !== 3) {
        await this.logoutCount();
      }
    },
    handleSelect (key) {
      this.menuIndex = key
      if (this.menuIndex == 1) {
        this.menuTitil = '用户'
      } else if (this.menuIndex == 2) { this.menuTitil = '特情' } else if (this.menuIndex == 3) { this.menuTitil = '计划' } else if (this.menuIndex == 4) { this.menuTitil = '武器' } else { { this.menuTitil = '强敌' } }
    },
    logoutCount () {
      this.$http.get(baseUrl + '/user/doLoginOut', {
        headers: {
          "Token": window.sessionStorage.getItem("token")
        }
      }).then(() => {

      })
      this.$message.success({
        message: '已退出登录',
        duration: 1500
      });
      this.$router.push({ path: "/login" });
    },
  },
  destroyed () {
    window.removeEventListener("beforeunload", (e) =>
      this.beforeunloadHandler(e)
    );
    window.removeEventListener("unload", (e) => this.unloadHandler(e));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.myHomes {
  width: 100%;
  height: 100%;
  background-image: url("../../../static/image/启动界面背景.png");
  background-size: cover;
  background-repeat: no-repeat;
  /* text-align: center; */
}
.myHomes .head {
  background: rgba(67, 97, 120, 0.5);
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.myHomes .head div {
  color: #fff;
  height: 50px;
  line-height: 50px;
  font-size: 21px;
  //margin-left: 20px;
}
.body {
  width: 100%;
  height: 50em;
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
}
.body_left {
  width: 20%;
  height: 100%;
  border: 1px solid rgb(67, 97, 120);
  border-radius: 10px;
}
.left_top {
  width: 100%;
  height: 48%;
}
.top_head {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: rgba(67, 97, 120, 0.5);
  div {
    color: whitesmoke;
    margin-left: 20px;
  }
}
.top_body {
  background: rgba(45, 68, 81.5);
}
.top_body .el-menu {
  border: 0 !important;
}

.el-tree {
  color: #ffffff; // 白色字体
  background: rgba(0, 0, 0, 0); // 整体背景透明
  /deep/ .el-checkbox__inner {
    background: rgba(0, 0, 0, 0); // checkbox 背景透明
  }
  /deep/ .el-tree-node__content:hover {
    background: rgba(104, 147, 215, 0.4); // hover 节点背景色，否则是白色
  }
  /deep/ .el-tree-node:focus > .el-tree-node__content {
    background-color: rgba(0, 0, 0, 0); // focus 节点背景透明，否则是白色
  }
}
.body_right {
  width: 70%;
  height: 100%;
  border: 1px solid rgb(67, 97, 120);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.right_body {
  width: 100%;
  height: 100%;
}
// .tablecss {
//   /* 修改复选框样式 变成单选框样式 */
//   /deep/ .el-checkbox__inner {
//     border: 1px solid #dcdfe6;
//     border-radius: 100%;
//     width: 14px;
//     height: 14px;
//     position: relative;
//     cursor: pointer;
//     display: inline-block;
//     box-sizing: border-box;
//     &::after {
//       transform: translate(-50%, -50%) scale(1);
//       width: 3px;
//       height: 3px;
//       border-radius: 100%;
//       background-color: #fff;
//       content: "";
//       position: absolute;
//       left: 50%;
//       top: 50%;
//       transition: transform 0.15s ease-in;
//     }
//   }
// }

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
/deep/ .right_body .el-table {
  border-color: #205978;
  color: whitesmoke;
  border-radius: 5px;
}
/deep/ .right_body .el-form-item__label {
  color: white;
}
/deep/ .el-upload-list__item-name {
  color: black;
}
/deep/ .el-message-box {
  background-color: rgba(67, 97, 120, 0.8);
}
/deep/ .el-dialog {
  background-color: rgba(67, 97, 120, 0.8);
}
/deep/ .el-dialog__header .el-dialog__title {
  color: white;
}
// /deep/ .right_body .el-button {
//   background: rgba(67, 97, 120, 0.5);
//   border-color: rgb(67, 97, 120);
// }
/deep/ .el-table::before {
  //去除底部白线
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
 .el-table--border::after  {
  width: 0px;
}

  .el-table__header-wrapper  {
  background: none;
}
</style>