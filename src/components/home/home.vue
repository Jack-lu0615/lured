<template>
  <div class="myHomes">
    <div class="getMyHome" v-if="userRole">
      <div class="analysisPage homesDivs" @click="push1">
        <span class="straghtSpan">分 析 评 估
         
          </span>
      </div>
      <div class="dataStorgePage homesDivs" @click="push2">
        <span class="straghtSpan">数 据 运 维
         
          </span>
      </div>
    </div>
    <div class="bottomlogo">
      <img src="../../../static/image/公司标志-02.png" alt="">
      <span>北京国遥新天地信息技术股份有限公司</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
        userRole:false
    }
  },
  mounted(){
    if(window.sessionStorage.getItem("userRole")=='3'){
      this.userRole = true
    }
    
  },
  methods:{
    push1(){
      this.$router.push({
          name:'analysis'}
      )
    },
    push2(){
      this.$router.push({
          name:'operation',query:{id:1}
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myHomes{
  width: 100%;
  height: 100%;
  background-image: url("../../../static/image/启动界面背景.png");
  background-size: cover;
  background-repeat: no-repeat;
  /* text-align: center; */
}
.myHomes .getMyHome{
  width: 100%;
  text-align: center;
  padding-top: 325px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.myHomes .straghtSpan{
  width: 100%;
  writing-mode: vertical-lr; /*竖着排列*/
  text-orientation: upright; /*保证文字竖着排列后不出现倒置*/
  /*transform:rotate(-180deg);将文字翻转180度，使其文字朝上*/
  display: flex; /*使盒子内的内容居中*/
  justify-content: center; /*水平居中*/
  align-items: center; /*垂直居中*/
  height: 100%; /*设置高度，居中需要定义高度*/
  font-weight: bold;
  font-size: 20px;
}
.myHomes .straghtSpan:hover{
  background-image: linear-gradient(rgb(239,240,241), rgb(14,252,252));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 25px;
}
.myHomes .getMyHome .analysisPage{
  background-image: url("../../../static/image/4未选中.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.myHomes .getMyHome .analysisPage:hover{
  background-image: url("../../../static/image/4已选中.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.myHomes .getMyHome .dataStorgePage{
  background-image: url("../../../static/image/5未选中.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.myHomes .getMyHome .dataStorgePage:hover{
  background-image: url("../../../static/image/5已选中.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.myHomes .getMyHome .homesDivs{
  display: inline-block;
  height: 420px;
  width: 300px;
  color: #fff;
  text-align: center;
  line-height: 420px;
  cursor: pointer;
}
.myHomes .bottomlogo{
  position: absolute;
  bottom: 10px;
  color: #fff;
  text-align: center;
  width: 100%;
}
.myHomes .bottomlogo img{
  width: 60px;
  height: 25px;
  vertical-align: middle;
  margin-right: 12px;
}
.myHomes .bottomlogo span{
  vertical-align: middle;
  line-height: 25px;
  font-size: 20px;
  font-family: 'Microsoft YaHei';
}
</style>