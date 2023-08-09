<template>
  <div class='myHomes'>
    <div class='getMyanalysis'>
      <div class='head'>
        <div>分析评估系统</div>
      </div>
      <div class='body'>
        <div class='body_left'>
          <div class='left_top'>
            <div class='top_head'>
              <div>仿真数据</div>
            </div>
            <div class='top_body'>
              <el-tree :data='data'
                       :props='defaultProps'
                       @node-click='handleNodeClick'></el-tree>
            </div>
          </div>
          <div class='left_bottom'>
            <div class='top_head'>
              <div>评估指标</div>
            </div>
            <div class='top_body'>
              <el-tree :data='data'
                       :props='defaultProps'
                       @node-click='handleNodeClick'></el-tree>
            </div>
          </div>
        </div>
        <div class='body_right'>
          <div class='top_head'>
            <div>图表可视化</div>
          </div>
          <div class='right_body'>
            <div>
              <div id='main1'
                   style='width: 500px; height: 300px'></div>
              <div id='main2'
                   style='width: 500px; height: 300px'></div>
            </div>
            <div>
              <div id='main3'
                   style='width: 500px; height: 300px'></div>
              <div id='main4'
                   style='width: 500px; height: 300px'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='bottomlogo'>
      <img src='../../../static/image/公司标志-02.png'
           alt='' />
      <span>北京国遥新天地信息技术股份有限公司</span>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'analysisDetails',
  data () {
    return {
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      myChart1: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
    };
  },
  mounted () {
    this.initCharts();
  },
  methods: {
    initCharts () {
      var chartDom1 = document.getElementById('main1');
      this.myChart1 = echarts.init(chartDom1);
      var option1
      var chartDom2 = document.getElementById('main2');
      this.myChart2 = echarts.init(chartDom2);
      var option2;
      var chartDom3 = document.getElementById('main3');
      this.myChart3 = echarts.init(chartDom3);
      var option3;
      var chartDom4 = document.getElementById('main4');
      this.myChart4 = echarts.init(chartDom4);
      var option4;
      option1 = {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
      option3 = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1],
          ],
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
      };
      option2 = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {},
          },
        ],
      };
      option4 = {
        title: {
          text: 'Basic Graph',
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
              show: true,
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20,
            },
            data: [
              {
                name: 'Node 1',
                x: 300,
                y: 300,
              },
              {
                name: 'Node 2',
                x: 800,
                y: 300,
              },
              {
                name: 'Node 3',
                x: 550,
                y: 100,
              },
              {
                name: 'Node 4',
                x: 550,
                y: 500,
              },
            ],
            // links: [],
            links: [
              {
                source: 0,
                target: 1,
                symbolSize: [5, 20],
                label: {
                  show: true,
                },
                lineStyle: {
                  width: 5,
                  curveness: 0.2,
                },
              },
              {
                source: 'Node 2',
                target: 'Node 1',
                label: {
                  show: true,
                },
                lineStyle: {
                  curveness: 0.2,
                },
              },
              {
                source: 'Node 1',
                target: 'Node 3',
              },
              {
                source: 'Node 2',
                target: 'Node 3',
              },
              {
                source: 'Node 2',
                target: 'Node 4',
              },
              {
                source: 'Node 1',
                target: 'Node 4',
              },
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0,
            },
          },
        ],
      };
      this.myChart1.setOption(option1);
      this.myChart3.setOption(option3);
      this.myChart2.setOption(option2);
      this.myChart4.setOption(option4);
      setTimeout(() => {
        window.onresize = () => {
          this.myChart1.resize();
          this.myChart3.resize();
          this.myChart2.resize();
          this.myChart4.resize();
        };
      }, 500);
    },
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style  lang='less' scoped>
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
}
.myHomes .head div {
  color: #fff;
  height: 50px;
  line-height: 50px;
  font-size: 21px;
  margin-left: 20px;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
.left_bottom {
  width: 100%;
  height: 48%;
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
  display: flex;

  align-items: center;
  div {
    width: 50%;
    display: flex;
    background: rgba(16, 25, 31, 0.5);
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
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
  font-family: "Microsoft YaHei";
}
</style>